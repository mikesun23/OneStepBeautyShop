import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

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


@NgModule({
  declarations: [AppComponent],
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
    TabsPageModule,
    PostingPageModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
