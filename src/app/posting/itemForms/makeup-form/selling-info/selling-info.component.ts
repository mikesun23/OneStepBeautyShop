import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FiftyStates } from 'src/app/common/us_states';

@Component({
  selector: 'app-selling-info',
  templateUrl: './selling-info.component.html',
  styleUrls: ['./selling-info.component.scss']
})
export class SellingInfoComponent implements OnInit {
  @Input() form: FormGroup;

  shippingCostActionSheet: any = {
    header: 'Shipping Cost Coverage',
    subHeader: 'how you want to pay for shipping?'
  };

  contactTypeActionSheet: any = {
    header: 'Contact Type',
    subHeader: 'Will be more types shortly'
  };

  addressStateActionSheet: any = {
    header: 'State'
  };

  shippingCostValidator = false;

  addressStateValidator = false;

  allStates: {}[] = new FiftyStates().getAll();

  sellingInfoForm: FormGroup;

  checkInit = false;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    // this.sellingInfoForm = this.fb.group({
    //   shippingCoverage: ['', Validators.required],
    //   contactInfo: this.fb.group({
    //     contactType: ['', Validators.required],
    //     accountNumber: ['', Validators.required]
    //   }),
    //   itemAddress: this.fb.group({
    //     city: [''],
    //     state: ['']
    //   })
    // });
  }

  ngOnInit() {
    this.sellingInfoForm = this.form;
    this.checkInit = true;
  }

  get shippingCoverage() { return this.sellingInfoForm.get('shippingCoverage'); }
  get contactType() { return this.sellingInfoForm.controls['contactInfo'].get('contactType'); }
  get accountNumber() { return this.sellingInfoForm.controls['contactInfo'].get('accountNumber'); }
  get city() { return this.sellingInfoForm.controls['itemAddress'].get('city'); }
  get state() { return this.sellingInfoForm.controls['itemAddress'].get('state'); }

  dismissModal() {
    this.modalController.dismiss({
      resultForm: this.sellingInfoForm
    });
    console.log('dismiss button was hit!!');
  }

  shippingCostOnChange() {
    if (this.shippingCoverage.value !== '') {
      this.shippingCostValidator = false;
    }
  }

  shippingCostOnCancel() {
    if (this.shippingCoverage.value === '') {
      this.shippingCostValidator = true;
    }
  }

  addressStateOnChange() {
    if (this.state.value !== '') {
      this.addressStateValidator = false;
    }
  }

  addressStateOnCancel() {
    if (this.state.value === '') {
      this.addressStateValidator = true;
    }
  }

}
