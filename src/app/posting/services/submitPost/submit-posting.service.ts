import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { map, switchMap } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class SubmitPostingService {

  private storageRef = firebase.storage().ref();

  private databaseRef = firebase.database().ref();

  private storageBasePath = '/RootPost';

  constructor(private db: AngularFireDatabase, private file: File) { }

  testCreatePost(itemPost) {
    console.log('service page was hit!');

    this.db.list('/testPost').push(itemPost);
  }

  testGet() {
    return this.db.list('/').snapshotChanges().pipe(
      map(data => {
        data.map(a => {
          console.log(a.payload.val());
        });
      })
    );
  }

  async submitPost(postObject: {}, imageList: string[], itemType: string) {
    // TODO: need to come back use dynamic data once login/signup implemented
    const userId = 'testMike'; // should be postObject['userId']

    imageList.map(url => this.convertImageUrlToDataUrl(url));

    const imageDownloadUrl = [];

    const dbUserPostsPath = '/RootPost/Pool/ApprovedPool/' + itemType + '/' + userId + '/posts';

    const postKey = await this.databaseRef.child(dbUserPostsPath).push().key;


    let index = 0;

    for (const i of imageList) {

      const imagePath = this.storageBasePath + '/' + userId + '/' + postKey + '/images/' + i['name'];

      await this.storageRef.child(imagePath).putString(i['imageData'], 'data_url').then(async res => {
        await this.storageRef.child(imagePath).getDownloadURL().then(async url => {
          imageDownloadUrl.push(url);
          index += 1;
          if (index === (imageList.length)) {
            const updates = {};
            postObject['imageDownLoadUrl'] = imageDownloadUrl;
            updates[dbUserPostsPath + '/' + postKey] = postObject;
            await this.databaseRef.update(updates).then(async () => {
              const blank = res;
              // TODO: need to come back implement 'updateUser' function once login/signup implemented
              // await this.updateUserWithNewPost(userId, postKey);
            });

          }
        });
      });

    }
  }

  async convertImageUrlToDataUrl(imageUrl: string) {
    const currentName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
    const correctPath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
    const res = await this.file.readAsDataURL(correctPath, currentName);
    return res;
  }

  updateUserWithNewPost(userId: string, postKey: string) {
    return '';
  }

  testPostImage(imageUrl) {
    firebase.storage().ref().child('/testPosts/').putString(imageUrl, 'data_url').then(res => {
      console.log('uploaded image!');
    });
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
