import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
// import { userInfo } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private googlePlus: GooglePlus, private router: Router) {
    this.user = this.afAuth.authState;

  }

  async nativeGoogleLogin() {
    if (this.user) {
      this.user.subscribe(u => {
        console.log(u.uid);
      });
    } else {

      try {
        const gplusUser = await this.googlePlus.login({
          'offline': true,
          'scopes': 'profile email'
        }).then(res => {
          const token = res['idToken'];
          this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(token)).then(result => {
            console.log('firebase user is: ' + result.displayName);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  logout() {
    // this.afAuth.a
    this.afAuth.auth.signOut().then(() => {
      console.log('what the hell is not livereloading');
      console.log('user type check: ' + this.user);
      this.user.subscribe(u => {
        if (u !== null) {
          console.log('user is still logged in');
        } else {
          console.log('user logged out');
          this.router.navigateByUrl('introduction').then(res => {
            console.log('logout status: ' + res);
          });
        }
      });
    });
    this.googlePlus.disconnect();
  }

}
