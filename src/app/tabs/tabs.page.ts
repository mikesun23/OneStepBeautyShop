import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private localStorage: Storage,
    private platform: Platform) {

    this.user = this.afAuth.authState;

  }

  ngOnInit() {
    this.user.subscribe(async user => {
      if (user !== null) {
        const localUser = await this.localStorage.get('localStoredUserId');
        if (localUser !== null && localUser !== undefined && localUser !== '') {
          // TODO: system has userId information already
          console.log('local storage has User information already');
        } else {
          this.localStorage.set('localStoredUserId', user.uid);
        }
      } else {
        // TODO: direct to login page, let user login again.
        console.log('user is not logged-in');
      }
    }).unsubscribe();
  }




}
