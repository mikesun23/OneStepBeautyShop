import { PostingPageRoutingModule } from './posting.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostingPage } from './posting.page';
import { MakeupFormComponent } from './itemForms/makeup-form/makeup-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostingPageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [PostingPage, MakeupFormComponent]
})
export class PostingPageModule { }
