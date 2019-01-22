import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SubmitPostingService {

  private storageRef = firebase.storage().ref();

  private databaseRef = firebase.database().ref();

  private storageBasePath = '/PostRoot';

  private dbRawPoolPath = '/PostRoot/RawPool';
  private dbSortedByLocationPoolPath = '/PostRoot/SortedPool/sortedByLocation';
  private dbSortedByUserPoolPath = '/PostRoot/SortedPool/sortedByUser';
  private dbSortedByTypePoolPath = '/PostRoot/SortedPool/sortedByType';
  private dbSortedByPricePoolPath = '/PostRoot/SortedPool/sortedByPrice';

  constructor(private db: AngularFireDatabase, private file: File, private localStorage: Storage) { }

  async submitPost(postObject: {}, imagePathUrlList: string[], titleImageIndex: number, itemType: string) {
    try {
      const user = await this.localStorage.get('localStoredUser');
      const userId = user['uid']; // should be postObject['userId']

      console.log('submitPost userId: ' + userId);
      if (userId !== '' && userId !== null && userId !== undefined) {
        const imageDataUrlList: {}[] = [];

        // manually convert imagePath to imageDataUrl
        for (const imageUrl of imagePathUrlList) {
          const currentName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          const correctPath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          const dataUrl = await this.file.readAsDataURL(correctPath, currentName);
          imageDataUrlList.push({ imageName: currentName, imageData: dataUrl });
        }

        console.log('imagePathUrlList length: ' + imagePathUrlList.length);
        console.log('imageDataUrlList length: ' + imageDataUrlList.length);
        const imageDownloadUrl = [];

        const postId = await this.databaseRef.child(this.dbRawPoolPath).push().key; // RawPool user postId as key

      let index = 0;

        // upload images and get imageDownloadUrl list
        for (const i of imageDataUrlList) {
          const imagePath = this.storageBasePath + '/' + userId + '/' + postId + '/images/' + i['imageName'];
          await this.storageRef.child(imagePath).putString(i['imageData'], 'data_url').then(async res => {
            await this.storageRef.child(imagePath).getDownloadURL().then(async url => {
              imageDownloadUrl.push(url);
              index += 1;
              console.log('uploading image, length: ' + index);
              if (index === (imageDataUrlList.length)) {

                const timeStamp = {
                  UTC: new Date().toUTCString(),
                  local: new Date().toString()
                };

                postObject['imageDownLoadUrl'] = imageDownloadUrl;
                postObject['userId'] = userId;
                postObject['postId'] = postId;
                postObject['itemType'] = itemType;
                postObject['timeStamp'] = timeStamp;
                postObject['titleImageIndex'] = titleImageIndex;

                this.savePostToRawPool(postObject, userId, postId);
                this.savePostToSortedByUserPool(postId, userId, timeStamp);
                this.savePostToSortedByTypePool(itemType, userId, postId);
                this.savePostToSortedByPricePool(postObject, userId, postId);
                this.savePostToSortedByLocationPool(postObject, userId, postId);
              }
            });
          });
        }
      }
    } catch (err) {
      console.log(err);
    }

  }

  async savePostToRawPool(postObject: {}, userId: string, postId: string) {
    const updates = {};
    updates[this.dbRawPoolPath + '/' + postId] = postObject;
    await this.databaseRef.update(updates).then(async () => {
      await this.updateUserWithNewPost(userId, postId);
    });
  }

  async savePostToSortedByUserPool(postId: string, userId: string, timeStamp: {}) {
    const updates = {};
    updates[this.dbSortedByUserPoolPath + '/' + userId + '/posts/' + postId] = timeStamp;
    this.databaseRef.update(updates);
  }

  async savePostToSortedByTypePool(itemType: string, userId: string, postId: string) {
    const updates = {};
    updates[this.dbSortedByTypePoolPath + '/' + itemType + '/' + postId] = { 'userId': userId };
    this.databaseRef.update(updates);
  }

  async savePostToSortedByPricePool(postObject: {}, userId: string, postId: string) {
    const price: number = postObject['basicInfo']['priceAsSell'];
    let bucketKey = '';
    const priceBuckets = {
      UnderTen: [0, 10],
      TenToFifty: [10, 50],
      FiftyToHundred: [50, 100],
      OverHundred: [100, 10000]
    };
    Object.keys(priceBuckets).forEach(key => {
      const start: number = priceBuckets[key][0];
      const end: number = priceBuckets[key][1];
      if (start <= price && price < end) {
        bucketKey = key;
      }
    });
    const updates = {};
    updates[this.dbSortedByPricePoolPath + '/' + bucketKey + '/' + postId] = { 'userId': userId };
    this.databaseRef.update(updates);
  }

  async savePostToSortedByLocationPool(postObject: {}, userId: string, postId: string) {
    const state: string = postObject['sellingInfo']['itemAddress']['state'];
    const updates = {};
    updates[this.dbSortedByLocationPoolPath + '/' + state + '/' + postId] = { 'userId': userId };
    this.databaseRef.update(updates);
  }

  // convert imageLocalUrl to dataUrl
  async convertImageUrlToDataUrl(imageUrl: any) {
    const currentName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
    const correctPath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
    const dataUrl = await this.file.readAsDataURL(correctPath, currentName);
    return { imageName: currentName, imageData: dataUrl };
  }

  // update user data with new postId
  updateUserWithNewPost(userId: string, postId: string) {
    return this.databaseRef.child('/users/powerGroup/' + userId + '/posts').push(postId);
  }

}
