import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FiftyStates } from 'src/app/common/us_states';

@Component({
  selector: 'app-selling-info',
  templateUrl: './selling-info.component.html',
  styleUrls: ['./selling-info.component.scss']
})
export class SellingInfoComponent implements OnInit {

  shippingCostActionSheet: any = {
    header: 'Shipping Cost Coverage',
    subheader: 'how you want to pay for shipping?'
  };

  addressStateActionSheet: any = {
    header: 'State'
  };

  allStates: {}[] = new FiftyStates().getAll();

  sellingInfoForm: FormGroup;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    this.sellingInfoForm = this.fb.group({
      shippingCoverage: [''],
      address: this.fb.group({
        city: [''],
        state: ['']
      })
    });
  }

  ngOnInit() {
  }

  get shippingCoverage() { return this.sellingInfoForm.get('shippingCoverage'); }
  get city() { return this.sellingInfoForm.controls['address'].get('city'); }
  get state() { return this.sellingInfoForm.controls['address'].get('state'); }

  dismissModal() {
    this.modalController.dismiss({
      resultForm: this.sellingInfoForm.value
    });
    console.log('dismiss button was hit!!');
  }

}
