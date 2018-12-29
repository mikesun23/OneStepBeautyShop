import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  itemConditionActionSheet: any = {
    header: 'Item Condition',
    subHeader: 'or how much LEFT?'
  }

  haveReceiptActionSheet: any = {
    header: 'Have Receipt?'
  }
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      'result': 'hello world'
    });
    console.log('dismiss button was hit!!')
  }


  

}
