import { Component, OnInit } from '@angular/core';
import { ItemType } from '../../models/postingModel/common/ItemType';
import { FormGroup } from '@angular/forms';
import { ItemCondition } from '../../models/postingModel/common/IitemConditionEnum';

import { ModalController } from '@ionic/angular';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { SellingInfoComponent } from './selling-info/selling-info.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';


@Component({
  selector: 'app-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.scss']
})
export class MakeupFormComponent implements OnInit {

  private itemTypeClass: ItemType = new ItemType();

  makeupForm: FormGroup = new FormGroup({});

  constructor(public modalController: ModalController) {
    this.makeupForm = this.itemTypeClass.initItemForm('makeup');
    console.log(this.makeupForm.controls);
  }

  ngOnInit() {
  }

  async showBasicInfoModal() {
    const modal = await this.modalController.create({
      component: BasicInfoComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      console.log(res);
    });

    return await modal.present();

  }

  async showDetailInfoModal() {
    console.log('detail info modal hit');
    const modal = await this.modalController.create({
      component: DetailInfoComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      console.log(res);
    });
    return await modal.present();
  }

  async showSellingInfoModal() {
    console.log('selling info modal hit');
    const modal = await this.modalController.create({
      component: SellingInfoComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      console.log(res);
    });

    return await modal.present();
  }

  async showImageUploadModal() {
    console.log('image upload modal hit');
    const modal = await this.modalController.create({
      component: ImageUploadComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      console.log(res);
    });

    return await modal.present();
  }

}

/**
 * itemType          *=> select
 * itemBrand         *=> input the brand name
 * itemName          *=> input the item name
 * itemNickName       => input the nickname
 *
 * priceAsNew         => input number
 * priceAsSell       *=> input number
 * itemCondition     *=> select the level
 *
 * haveReceipt        => select true or false
 * briefDescription   => textarea
 *
 * reasonSell         => textarea
 * reasonBuy          => textarea
 * specialSellingPoints  => textarea
 *
 * mfgDate            => dropdown
 * expDate            => dropdown
 * capacityAsNew      => input number
 * capacityAsSell     => input number
 * colorCode          => input text
 *
 * priceNeogotiableLevel  *=> select level
 * mailingCostCoverage    *=> select value, covered(any cost), partial covered(need input number), not coverd(0 dollar)
 * itemAddress            *=> input
 *
 *
 *
 *
 *
 *
 *
 *
 */
