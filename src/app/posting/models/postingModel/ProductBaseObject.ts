import { ItemAddress } from "./common/ItemAddress";

/**
  * 
  * makeup        ^^
  * skikncare     ^^
  * hair           
  * tools & brushes
  * fragrance
  * bath & body
  * 
  * {makeup, skincare, hair, bath-body, fragrance, tools}
  * 
  * 
  * 
  * 
  */

export class ProductBaseObject {

  itemType: string;

  itemBrand: string;

  itemName: string;

  priceAsNew: number;

  priceAsSell: number;

  itemCondition: string; // {1-10, very old, medium old, pretty new, like new, new}


  priceNegotiableLevel: string;
  mailingCostCoverage: string;
  itemAddress: ItemAddress;

  constructor(initValue: ProductBaseInterface = {}) {
    this.itemType = initValue.itemType || '';
    this.itemBrand = initValue.itemBrand || '';
    this.itemName = initValue.itemName || '';

    this.priceAsNew = initValue.priceAsNew || -1;
    this.priceAsSell = initValue.priceAsSell || -1;
    this.itemCondition = initValue.itemCondition || '';

    this.priceNegotiableLevel = initValue.priceNegotiableLevel || '';
    this.mailingCostCoverage = initValue.mailingCostCoverage || '';
    this.itemAddress = initValue.itemAddress || new ItemAddress();
  }

}

export interface ProductBaseInterface {

  itemType?: string
  itemBrand?: string
  itemName?: string
  priceAsNew?: number
  priceAsSell?: number
  itemCondition?: string
  priceNegotiableLevel?: string
  mailingCostCoverage?: string
  itemAddress?: ItemAddress;

}