import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemType } from './models/postingModel/common/ItemType';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.page.html',
  styleUrls: ['./posting.page.scss'],
})
export class PostingPage implements OnInit {

  itemTypes: string[] = new ItemType().getItemType();

  selectedType: string = '';

  formReady: boolean = false;

  constructor(public navController: NavController) { }


  ngOnInit() {
  }

  itemTypeSelected(value: string) {
    console.log(value)
    this.formReady = this.selectedType != '' ? true : false;
  }

  nextStep() {
    console.log('next fucking step is not fucking rendering!!');
  }
}


/**
 *
 *
 * goal: dynamic form,
 * we need to componentize the form, modulize all parts of the form, then loop through the formGroup,
 * then render the
 *
 *
 */