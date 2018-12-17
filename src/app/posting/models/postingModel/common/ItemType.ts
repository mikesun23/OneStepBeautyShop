import { FormConvertorService } from './../../../services/formConvertor/form-convertor.service';
import { MakeupObject, MakeupInterface } from './../beautyProductObjectGroup/MakeupObject';
import { FormGroup } from '@angular/forms';
import { SkincareObject } from '../beautyProductObjectGroup/SkincareObject';
export class ItemType {

  itemType: string[] = ["makeup", "skincare", "tools", "fragrance", "hair", "bathbody"];

  constructor(private formConvertor: FormConvertorService = new FormConvertorService()) { }

  getItemType() {
    return this.itemType;
  }

  initItemForm(itemType: string) {

    switch (itemType) {
      case "makeup": {
        let makeupItemObject: MakeupObject = new MakeupObject({});
        return this.formConvertor.convertObjectToForm(makeupItemObject);

      }
      case "skincare": {
        let skincareItemObject: SkincareObject = new SkincareObject({});
        return this.formConvertor.convertObjectToForm(skincareItemObject);
      }
      default: {
        return new FormGroup({});
      }
    }
  }

}

/**
 *
 *
 *
 *
 *
 *
 */