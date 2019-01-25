import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { AboutPageModule } from '../about/about.module';
import { HomePageModule } from '../home/home.module';
import { PostingPageModule } from './../posting/posting.module';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ListingModule } from '../listing/listing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AboutPageModule,
    ContactPageModule,
    PostingPageModule,
    ListingModule

  ],
  entryComponents: [
    LoginModalComponent
  ],
  declarations: [
    TabsPage,
    LoginModalComponent
  ]
})
export class TabsPageModule { }
