import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { PostingPage } from '../posting/posting.page';

import { MakeupFormComponent } from './../posting/itemForms/makeup-form/makeup-form.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'posting',
        outlet: 'postingOutlet',
        component: PostingPage
      },
      {
        path: 'posting/makeupForm',
        outlet: 'postingOutlet',
        component: MakeupFormComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
