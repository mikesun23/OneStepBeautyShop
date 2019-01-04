import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  priceCutLevelActionSheet: any = {
    header: 'Price Cut Level',
    subHeader: 'how much you can negotiate on price?'
  };

  detailInfoForm: FormGroup;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    this.detailInfoForm = this.fb.group({
      colorCode: [''],
      capacityAsSell: ['', Validators.required],
      capacityAsNew: [''],
      expDate: [''],
      expDateNA: [''],
      priceNegotiableLevel: ['', Validators.required],
      briefDescription: ['']
    });
  }

  ngOnInit() {
  }

  get colorCode() { return this.detailInfoForm.get('colorCode'); }
  get capacityAsSell() { return this.detailInfoForm.get('capacityAsSell'); }
  get capacityAsNew() { return this.detailInfoForm.get('capacityAsNew'); }
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

}
