import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubmitPostingService } from 'src/app/posting/services/submitPost/submit-posting.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  itemConditionActionSheet: any = {
    header: 'Item Condition',
    subHeader: 'or how much LEFT?'
  };

  haveReceiptActionSheet: any = {
    header: 'Have Receipt?'
  };

  basicInfoForm: FormGroup;

  enableNext = false;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    this.basicInfoForm = this.fb.group({
      itemBrand: ['', Validators.required],
      itemName: ['', Validators.required],
      itemNickName: [''],
      itemCondition: ['', Validators.required],
      priceAsNew: [''],
      priceAsSell: ['', Validators.required],
      haveReceipt: ['']
    });
  }

  ngOnInit() {
  }

  get itemBrand() { return this.basicInfoForm.get('itemBrand'); }
  get itemName() { return this.basicInfoForm.get('itemName'); }
  get itemNickName() { return this.basicInfoForm.get('itemNickName'); }
  get itemCondition() { return this.basicInfoForm.get('itemCondition'); }
  get priceAsNew() { return this.basicInfoForm.get('priceAsNew'); }
  get priceAsSell() { return this.basicInfoForm.get('priceAsSell'); }
  get haveReceipt() { return this.basicInfoForm.get('haveReceipt'); }

  dismissModal() {
    this.modalController.dismiss({
      resultForm: this.basicInfoForm
    });
    console.log('dismiss button was hit!!');
  }
}
