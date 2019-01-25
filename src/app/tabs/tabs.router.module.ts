import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { PostingPage } from '../posting/posting.page';

import { MakeupFormComponent } from './../posting/itemForms/makeup-form/makeup-form.component';
import { ListingComponent } from '../listing/listing.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'listing',
        outlet: 'listingOutlet',
        component: ListingComponent
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
      },
      {
        path: 'home',
        outlet: 'homeOutlet',
        component: HomePage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(listingOutlet:listing)',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
