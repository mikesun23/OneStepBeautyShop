import { PostingPageRoutingModule } from './posting.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { IonicModule } from '@ionic/angular';

import { PostingPage } from './posting.page';
import { MakeupFormComponent } from './itemForms/makeup-form/makeup-form.component';
import { BasicInfoComponent } from './itemForms/makeup-form/basic-info/basic-info.component';
import { DetailInfoComponent } from './itemForms/makeup-form/detail-info/detail-info.component';
import { ImageUploadComponent } from './itemForms/makeup-form/image-upload/image-upload.component';
import { SellingInfoComponent } from './itemForms/makeup-form/selling-info/selling-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostingPageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    PostingPage,
    MakeupFormComponent,
    BasicInfoComponent,
    DetailInfoComponent,
    ImageUploadComponent,
    SellingInfoComponent
  ],
  providers: [
    PhotoLibrary,
    Camera
  ]
})
export class PostingPageModule { }
