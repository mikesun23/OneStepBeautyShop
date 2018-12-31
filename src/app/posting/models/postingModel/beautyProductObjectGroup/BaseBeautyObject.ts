import { ProductBaseObject, ProductBaseInterface } from './../ProductBaseObject';

export class BaseBeautyObject extends ProductBaseObject {


  // basic section
  itemNickName: string;

  // detail section: customized part
  haveReceipt: boolean;
  briefDescription: string;

  // sellers notes: customized part
  reasonSell: string;
  reasonBuy: string;
  specialSellingPoints: string;

  constructor(initValue: BaseBeautyInterface = {}) {
    super(initValue);

    this.itemNickName = initValue.itemNickName || '';

    this.haveReceipt = initValue.haveReceipt || false;
    this.briefDescription = initValue.briefDescription || '';

    this.reasonSell = initValue.reasonSell || '';
    this.reasonBuy = initValue.reasonBuy || '';
    this.specialSellingPoints = initValue.specialSellingPoints || '';


  }

}

export interface BaseBeautyInterface extends ProductBaseInterface {

  itemNickName?: string;
  haveReceipt?: boolean;
  briefDescription?: string;
  reasonSell?: string;
  reasonBuy?: string;
  specialSellingPoints?: string;

}
