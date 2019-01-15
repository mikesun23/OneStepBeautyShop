import { Component, OnInit } from '@angular/core';
import { ItemType } from '../../models/postingModel/common/ItemType';
import { FormGroup } from '@angular/forms';


import { ModalController, LoadingController } from '@ionic/angular';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { SellingInfoComponent } from './selling-info/selling-info.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SubmitPostingService } from '../../services/submitPost/submit-posting.service';
import { Router } from '@angular/router';
import { UploadingModalComponent } from './uploading-modal/uploading-modal.component';


@Component({
  selector: 'app-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.scss']
})
export class MakeupFormComponent implements OnInit {

  private itemTypeClass: ItemType = new ItemType();

  makeupForm: FormGroup = new FormGroup({});
  imageUrlList: string[] = [];

  enableDetailInfo = false;
  enableSellingInfo = false;
  enableUploadImg = false;
  enableSubmitPost = false;
  enableSuccessMessage = false;

  constructor(
    public modalController: ModalController,
    private postingService: SubmitPostingService,
    private router: Router,
    public loadingController: LoadingController) {

    this.makeupForm = this.itemTypeClass.initItemForm('makeup');
    this.makeupForm.value['itemType'] = 'makeup';
  }

  ngOnInit() {
  }

  async showBasicInfoModal() {
    const modal = await this.modalController.create({
      component: BasicInfoComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      const basicForm = res.data['resultForm'] as FormGroup;
      Object.keys(basicForm.controls).forEach(key => {
        if (this.makeupForm.controls[key]) {
          this.makeupForm.controls[key] = basicForm.controls[key];
          this.makeupForm.value[key] = basicForm.controls[key].value;
        }
      });

      this.enableDetailInfo = true;
    });
    return await modal.present();
  }

  async showDetailInfoModal() {
    const modal = await this.modalController.create({
      component: DetailInfoComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      const detailForm = res.data['resultForm'] as FormGroup;
      Object.keys(detailForm.controls).forEach(key => {
        if (this.makeupForm.controls[key]) {
          this.makeupForm.controls[key] = detailForm.controls[key];
          this.makeupForm.value[key] = detailForm.controls[key].value;
        }
      });
      this.enableSellingInfo = true;
    });
    return await modal.present();
  }

  async showSellingInfoModal() {
    const modal = await this.modalController.create({
      component: SellingInfoComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      const sellingForm = res.data['resultForm'] as FormGroup;
      console.log(sellingForm);
      Object.keys(sellingForm.controls).forEach(key => {
        console.log(key);
        if (this.makeupForm.controls[key]) {
          console.log(key);
          this.makeupForm.controls[key] = sellingForm.controls[key];
          this.makeupForm.value[key] = sellingForm.controls[key].value;
        }
      });
      console.log(this.makeupForm.value);
      this.enableUploadImg = true;
    });

    return await modal.present();
  }

  async showImageUploadModal() {
    const modal = await this.modalController.create({
      component: ImageUploadComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then(res => {
      this.imageUrlList = res.data['imageUrlList'];
      this.enableSubmitPost = true;
    });

    return await modal.present();
  }

  async showLoadingModal() {
    const modal = await this.loadingController.create({
      message: 'Uploading...'
    });

    return await modal.present();
  }

  async showLoadingSuccessMessageModal() {
    const modal = await this.modalController.create({
      component: UploadingModalComponent,
      componentProps: {}
    });

    return await modal.present();
  }

  async submitPost() {
    this.showLoadingModal().then(() => {
      this.postingService.submitPost(this.makeupForm.value, this.imageUrlList, this.makeupForm.value['itemType']).then(() => {

        this.loadingController.dismiss();
        this.showLoadingSuccessMessageModal().then(() => {
          setTimeout(() => {
            this.modalController.dismiss();
          }, 1500);
        });
        this.router.navigateByUrl('/');
      });
    });
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
 PRE SET:
    itemType

NON USED:
    mfgDate
    reasonBuy:
    reasonSell
    specialSellingPoints:


BASIC INFO:
    itemBrand
    itemName
    itemNickName
    itemCondition
    priceAsNew
    priceAsSell
    haveReceipt

DETAIL INFO:
    colorCode
    capacityAsSell
    capacityAsNew
    expDate
    *(new add) expDateNA
    priceNegotiableLevel
    briefDescription

SELLING INFO:
    shippingCoverage
    itemAddress
    contactInfo

 *
 *
 *
 *
 *
 */
