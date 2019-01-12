import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from '../environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsPageModule } from './tabs/tabs.module';
import { PostingPageModule } from './posting/posting.module';
import { BasicInfoComponent } from './posting/itemForms/makeup-form/basic-info/basic-info.component';
import { DetailInfoComponent } from './posting/itemForms/makeup-form/detail-info/detail-info.component';
import { SellingInfoComponent } from './posting/itemForms/makeup-form/selling-info/selling-info.component';
import { ImageUploadComponent } from './posting/itemForms/makeup-form/image-upload/image-upload.component';
import { IntroductionSliderComponent } from './introduction-slider/introduction-slider.component';


@NgModule({
  declarations: [AppComponent, IntroductionSliderComponent],
  entryComponents: [
    BasicInfoComponent,
    DetailInfoComponent,
    SellingInfoComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    TabsPageModule,
    PostingPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    GooglePlus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
