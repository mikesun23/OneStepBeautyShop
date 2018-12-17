import { BaseBeautyObject, BaseBeautyInterface } from './BaseBeautyObject';

export class SkincareObject extends BaseBeautyObject {

  // itemType: string = 'makeup';
  mfgDate: Date;
  expDate: Date;
  capacityAsNew: string;
  capacityAsSell: string;

  constructor(initValue: SkincareInterface = {}) {
    super(initValue);

    this.itemType = "skincare";
    this.mfgDate = initValue.mfgDate || new Date();
    this.expDate = initValue.expDate || new Date();
    this.capacityAsNew = initValue.capacityAsNew || '';
    this.capacityAsSell = initValue.capacityAsSell || '';

  }

}

export interface SkincareInterface extends BaseBeautyInterface {
  mfgDate?: Date;
  expDate?: Date;
  capacityAsNew?: string;
  capacityAsSell?: string;
}