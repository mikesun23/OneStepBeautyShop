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
    private localStorage: Storage) {

    this.user = this.afAuth.authState;
  }

  async ngOnInit() {
    if (this.user !== undefined && this.user !== null) {
      this.user.subscribe(async user => {
        const localUser = await this.localStorage.get('localStoredUser');
        if (localUser === null || localUser === undefined || localUser !== '') {
          this.localStorage.set('localStoredUser', user);
          this.localStorage.set('localStoredUserId', user.uid);
        }
      });
    } else {
      // navigate to login page, let user login/signup
    }
  }




}
