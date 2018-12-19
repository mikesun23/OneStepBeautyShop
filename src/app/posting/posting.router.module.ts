import { MakeupFormComponent } from './itemForms/makeup-form/makeup-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingPage } from './posting.page';

const routes: Routes = [
  {
    path: '',
    component: PostingPage,
    outlet: 'postingOutlet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostingPageRoutingModule { }
