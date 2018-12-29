import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selling-info',
  templateUrl: './selling-info.component.html',
  styleUrls: ['./selling-info.component.scss']
})
export class SellingInfoComponent implements OnInit {

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
