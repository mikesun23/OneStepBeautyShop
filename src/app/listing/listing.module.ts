import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FetchRawListService } from './services/fetchRawList/fetch-raw-list.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ListingComponent }])
  ],
  declarations: [

  ],
  entryComponents: [

  ],
  providers: [
    FetchRawListService
  ]
})
export class ListingModule { }
