import { FormGroup, FormBuilder } from '@angular/forms';
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
      color: [''],
      capacityLeft: [''],
      capacityAsNew: [''],
      expDate: [''],
      priceCutLevel: [''],
      description: ['']
    });
  }

  ngOnInit() {
  }

  get color() { return this.detailInfoForm.get('color'); }
  get capacityLeft() { return this.detailInfoForm.get('capacityLeft'); }
  get capacityAsNew() { return this.detailInfoForm.get('capacityAsNew'); }
  get expDate() { return this.detailInfoForm.get('expDate'); }
  get priceCutLevel() { return this.detailInfoForm.get('priceCutLevel'); }
  get description() { return this.detailInfoForm.get('description'); }

  dismissModal() {
    this.modalController.dismiss({
      resultForm: this.detailInfoForm.value
    });
    console.log('dismiss button was hit!!');
  }

}
