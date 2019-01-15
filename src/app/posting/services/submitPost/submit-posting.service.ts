import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SubmitPostingService implements OnInit {

  private user: firebase.User;

  private storageRef = firebase.storage().ref();

  private databaseRef = firebase.database().ref();

  private storageBasePath = '/RootPost';

  constructor(private db: AngularFireDatabase, private file: File, private localStorage: Storage) { }

  async ngOnInit() {
    this.user = await this.localStorage.get('localStoredUserId');
    console.log(this.user);
  }

  async submitPost(postObject: {}, imagePathUrlList: string[], itemType: string) {
    // TODO: need to come back use dynamic data once login/signup implemented
    const userId = 'testMike0006688999'; // should be postObject['userId']

    const imageDataUrlList: {}[] = [];

    // manually convert imagePath to imageDataUrl
    for (const imageUrl of imagePathUrlList) {
      const currentName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
      const correctPath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
      const dataUrl = await this.file.readAsDataURL(correctPath, currentName);
      imageDataUrlList.push({imageName: currentName, imageData: dataUrl});
    }

    // for some reason directly call the convertor function doesn't work out.
    // const test = await imagePathUrlList.map(async x => await this.convertImageUrlToDataUrl(x));

    const imageDownloadUrl = [];

    const dbUserPostsPath = '/RootPost/Pool/ApprovedPool/' + itemType + '/' + userId + '/posts';

    const postKey = await this.databaseRef.child(dbUserPostsPath).push().key;

    let index = 0;

    for (const i of imageDataUrlList) {
      const imagePath = this.storageBasePath + '/' + userId + '/' + postKey + '/images/' + i['imageName'];
      await this.storageRef.child(imagePath).putString(i['imageData'], 'data_url').then(async res => {
        await this.storageRef.child(imagePath).getDownloadURL().then(async url => {
          imageDownloadUrl.push(url);
          index += 1;
          if (index === (imageDataUrlList.length)) {
            const updates = {};
            postObject['imageDownLoadUrl'] = imageDownloadUrl;
            updates[dbUserPostsPath + '/' + postKey] = postObject;
            await this.databaseRef.update(updates).then(async () => {
              await this.updateUserWithNewPost(userId, postKey);
            });
          }
        });
      });
    }
  }

  // convert imageLocalUrl to dataUrl
  async convertImageUrlToDataUrl(imageUrl: any) {
    const currentName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
    const correctPath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
    const dataUrl = await this.file.readAsDataURL(correctPath, currentName);
    return { imageName: currentName, imageData: dataUrl };
  }

  // update user data with new postId
  updateUserWithNewPost(userId: string, postKey: string) {
    this.databaseRef.child('/users/firstGroup/' + userId + '/posts').push(postKey);
  }

}

/**
 *  image Object: {
 *    name: string,
 *    type: string,
 *    date: date,
 *    data
 *  }
 */
