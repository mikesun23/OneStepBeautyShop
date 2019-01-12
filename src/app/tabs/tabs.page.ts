import { Component } from '@angular/core';
import { PostingPageModule } from './../posting/posting.module';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private googlePlus: GooglePlus, private platform: Platform) {
    // this.afAuth.authState.subscribe(res => {
    //   console.log('user is: ');
    //   console.log(res);
    // });

  }




}
