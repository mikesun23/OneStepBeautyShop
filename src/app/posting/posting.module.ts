import { PostingPageRoutingModule } from './posting.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

import { IonicModule } from '@ionic/angular';

import { PostingPage } from './posting.page';
import { MakeupFormComponent } from './itemForms/makeup-form/makeup-form.component';
import { BasicInfoComponent } from './itemForms/makeup-form/basic-info/basic-info.component';
import { DetailInfoComponent } from './itemForms/makeup-form/detail-info/detail-info.component';
import { ImageUploadComponent } from './itemForms/makeup-form/image-upload/image-upload.component';
import { SellingInfoComponent } from './itemForms/makeup-form/selling-info/selling-info.component';
import { SubmitPostingService } from './services/submitPost/submit-posting.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostingPageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  entryComponents: [
    BasicInfoComponent,
    DetailInfoComponent,
    SellingInfoComponent,
    ImageUploadComponent,
  ],
  declarations: [
    PostingPage,
    MakeupFormComponent,
    BasicInfoComponent,
    DetailInfoComponent,
    ImageUploadComponent,
    SellingInfoComponent,
  ],
  providers: [
    PhotoLibrary,
    SubmitPostingService
  ]
})
export class PostingPageModule { }
