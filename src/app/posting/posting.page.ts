import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemType } from './models/postingModel/common/ItemType';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.page.html',
  styleUrls: ['./posting.page.scss'],
})
export class PostingPage implements OnInit {

  itemTypes: string[] = new ItemType().getItemType();

  selectedType = '';

  formReady = false;

  formPath = '';

  constructor(public navController: NavController, private router: Router) { }


  ngOnInit() {
  }



  itemTypeSelected(value: string) {
    this.selectedType = value;
    this.formReady = true;
    this.formPath = '/tabs/(postingOutlet:posting/' + value + 'Form)';
    console.log(this.formPath);
  }

  nextStep() {
    this.router.navigateByUrl(this.formPath);
  }
}
