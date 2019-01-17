import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction-slider',
  templateUrl: './introduction-slider.component.html',
  styleUrls: ['./introduction-slider.component.scss']
})
export class IntroductionSliderComponent implements OnInit {

  welcomeMessage = 'Welcome ';
  showMessage = false;

  constructor(private afAuth: AngularFireAuth, private googlePlus: GooglePlus, private router: Router) { }

  ngOnInit() {
  }

  async nativeGoogleLogin() {

    try {
      await this.googlePlus.login({
        // 'webClientId': '991993653440-gk1p5ua90q176sq25jbbdtmkgl58487k.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
        // 'scopes': 'https://www.googleapis.com/auth/userinfo.email'

      }).then(res => {
        const token = res['idToken'];
        this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(token)).then(result => {
          this.welcomeMessage += result.displayName + '!';
          this.showMessage = true;
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1500);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }


}
