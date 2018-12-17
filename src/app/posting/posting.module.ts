import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostingPage } from './posting.page';
import { MakeupFormComponent } from './itemForms/makeup-form/makeup-form.component';

const routes: Routes = [
  {
    path: '',
    component: PostingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostingPage, MakeupFormComponent]
})
export class PostingPageModule {}
