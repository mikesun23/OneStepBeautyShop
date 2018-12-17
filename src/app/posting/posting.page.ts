import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemType } from './models/postingModel/common/ItemType';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.page.html',
  styleUrls: ['./posting.page.scss'],
})
export class PostingPage implements OnInit {

  itemTypes: string[] = new ItemType().getItemType();

  selectedType: string = '';

  formReady: boolean = false;

  constructor() { }


  ngOnInit() {
  }

  itemTypeSelected() {
    this.formReady = this.selectedType != '' ? true : false;
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