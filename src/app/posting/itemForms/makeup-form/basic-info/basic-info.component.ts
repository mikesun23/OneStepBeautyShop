import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  @Input() form: FormGroup;

  itemConditionActionSheet: any = {
    header: 'Item Condition',
    subHeader: 'or how much LEFT?'
  };

  haveReceiptActionSheet: any = {
    header: 'Have Receipt?'
  };

  itemConditionValidator = false;

  itemConditionSelectedText = '';

  haveReceiptSelectedText = '';

  basicInfoForm: FormGroup = new FormGroup({});

  enableNext = false;

  checkInit = false;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    // this.basicInfoForm = this.fb.group({
    //   itemBrand: ['', Validators.required],
    //   itemName: ['', Validators.required],
    //   itemNickName: [''],
    //   itemCondition: ['', Validators.required],
    //   priceAsNew: [''],
    //   priceAsSell: ['', Validators.required],
    //   haveReceipt: ['']
    // });
  }

  ngOnInit() {
    this.basicInfoForm = this.form;
    this.checkInit = true;
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

  itemConditionOnChange() {
    const itemConditionMap = {
      10: 'New(10/10)',
      8: 'Used(8/10)',
      6: 'Used(6/10)',
      4: 'Used(4/10)',
      2: 'Used(2/10)'
    };
    const value: number = this.itemCondition.value;
    if (this.itemCondition.value !== '') {
      this.itemConditionSelectedText = itemConditionMap[value];
      this.itemConditionValidator = false;
    }
  }

  itemConditionOnCancel() {
    if (this.itemCondition.value === '') {
      this.itemConditionValidator = true;
    }
  }

  haveReceiptOnChange() {
    const haveReciptMap = {
      1: 'Yes',
      0: 'No'
    };
    const value: any = this.haveReceipt.value;
    if (value !== '') {
      this.haveReceiptSelectedText = haveReciptMap[value];
    }
  }
}
