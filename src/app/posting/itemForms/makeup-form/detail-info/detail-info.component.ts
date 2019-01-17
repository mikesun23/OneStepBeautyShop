import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {
  @Input() form: FormGroup;

  priceCutLevelActionSheet: any = {
    header: 'Price Cut Level',
    subHeader: 'how much you can negotiate on price?'
  };

  capacityUnitActionSheet: any = {
    header: 'Choose Capacity Unit',
    subHeader: ''
  };

  capacityUnitAbr = '...';

  priceNegotiableText = '';

  priceNegoTouched = false;

  capacityUnitTouched = false;

  detailInfoForm: FormGroup;

  checkInit = false;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    // this.detailInfoForm = this.fb.group({
    //   colorCode: [''],
    //   capacityUnit: ['', Validators.required],
    //   capacityAsSell: ['', Validators.required],
    //   capacityAsNew: [''],
    //   expDate: [''],
    //   expDateNA: [''],
    //   priceNegotiableLevel: ['', Validators.required],
    //   briefDescription: ['']
    // });
  }

  ngOnInit() {
    this.detailInfoForm = this.form;
    this.checkInit = true;
  }

  get colorCode() { return this.detailInfoForm.get('colorCode'); }
  get capacityAsSell() { return this.detailInfoForm.get('capacityAsSell'); }
  get capacityAsNew() { return this.detailInfoForm.get('capacityAsNew'); }
  get capacityUnit() { return this.detailInfoForm.get('capacityUnit'); }
  get expDate() { return this.detailInfoForm.get('expDate'); }
  get expDateNA() { return this.detailInfoForm.get('expDateNA'); }
  get priceNegotiableLevel() { return this.detailInfoForm.get('priceNegotiableLevel'); }
  get briefDescription() { return this.detailInfoForm.get('briefDescription'); }

  dismissModal() {
    this.modalController.dismiss({
      resultForm: this.detailInfoForm
    });
    console.log('dismiss button was hit!!');
  }

  capacityUnitSelected() {
    const value: string = this.capacityUnit.value;
    console.log('abr: ' + this.capacityUnitAbr);
    console.log('value: ' + value);
    if (value === 'g' || value === 'ml') {
      this.capacityUnitAbr = value;
      this.capacityUnitTouched = false;
    } else {
      console.log('value is: ' + value);
    }
  }

  capacityUnitCancelled() {
    if (this.capacityUnit.value === '') {
      this.capacityUnitTouched = true;
    }
  }

  priceNegotiableSelectedText() {
    const negotiableLevel = {
      1: 'Depends',
      2: 'Little Chop',
      3: 'No Chop'
    };
    const selectedLevel = this.priceNegotiableLevel.value;
    if (selectedLevel !== '') {
      this.priceNegotiableText = negotiableLevel[selectedLevel];
      this.priceNegoTouched = false;
    }
  }

  priceNegoCancelled() {
    if (this.priceNegotiableLevel.value === '') {
      this.priceNegoTouched = true;
    }
  }

}
