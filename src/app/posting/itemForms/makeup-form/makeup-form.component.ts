import { Component, OnInit } from '@angular/core';
import { ItemType } from '../../models/postingModel/common/ItemType';
import { FormGroup } from '@angular/forms';
import { ItemCondition } from '../../models/postingModel/common/IitemConditionEnum';

@Component({
  selector: 'app-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.scss']
})
export class MakeupFormComponent implements OnInit {

  private itemTypeClass: ItemType = new ItemType();

  makeupForm: FormGroup = new FormGroup({});

  testElement = ItemCondition

  constructor() { 
    this.makeupForm = this.itemTypeClass.initItemForm('makeup');
    console.log(this.makeupForm.controls);
  }

  ngOnInit() {
    
    Object.keys(this.testElement).forEach(x => console.log(x));
  }

}

/** 
 * itemType          *=> select
 * itemBrand         *=> input the brand name
 * itemName          *=> input the item name
 * itemNickName       => input the nickname            
 * 
 * priceAsNew         => input number
 * priceAsSell       *=> input number
 * itemCondition     *=> select the level
 *  
 * haveReceipt        => select true or false
 * briefDescription   => textarea
 *  
 * reasonSell         => textarea
 * reasonBuy          => textarea
 * specialSellingPoints  => textarea
 * 
 * mfgDate            => dropdown
 * expDate            => dropdown
 * capacityAsNew      => input number
 * capacityAsSell     => input number
 * colorCode          => input text
 * 
 * priceNeogotiableLevel  *=> select level
 * mailingCostCoverage    *=> select value, covered(any cost), partial covered(need input number), not coverd(0 dollar)
 * itemAddress            *=> input 
 * 
 * 
 * 
 */
