import { BaseBeautyObject, BaseBeautyInterface } from './BaseBeautyObject';

export class MakeupObject extends BaseBeautyObject {

  // itemType: string = 'makeup';
  mfgDate: Date;
  expDate: Date;
  capacityAsNew: string;
  capacityAsSell: string;
  colorCode: string;

  constructor(initValue: MakeupInterface = {}) {
    super(initValue);

    this.itemType = "makeup";
    this.mfgDate = initValue.mfgDate || new Date();
    this.expDate = initValue.expDate || new Date();
    this.capacityAsNew = initValue.capacityAsNew || '';
    this.capacityAsSell = initValue.capacityAsSell || '';
    this.colorCode = initValue.colorCode || '';

  }

}

export interface MakeupInterface extends BaseBeautyInterface {

  mfgDate?: Date;
  expDate?: Date;
  capacityAsNew?: string;
  capacityAsSell?: string;
  colorCode?: string;

}