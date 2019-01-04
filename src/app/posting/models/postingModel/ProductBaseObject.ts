import { ItemAddress } from './common/ItemAddress';
import { ContactInfo } from './common/ContactInfo';

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
  shippingCoverage: string;
  itemAddress: ItemAddress;
  contactInfo: ContactInfo;

  constructor(initValue: ProductBaseInterface = {}) {
    this.itemType = initValue.itemType || '';
    this.itemBrand = initValue.itemBrand || '';
    this.itemName = initValue.itemName || '';

    this.priceAsNew = initValue.priceAsNew || -1;
    this.priceAsSell = initValue.priceAsSell || -1;
    this.itemCondition = initValue.itemCondition || '';

    this.priceNegotiableLevel = initValue.priceNegotiableLevel || '';
    this.shippingCoverage = initValue.shippingCoverage || '';
    this.itemAddress = initValue.itemAddress || new ItemAddress();
    this.contactInfo = initValue.contactInfo || new ContactInfo();
  }

}

export interface ProductBaseInterface {
  itemType?: string;
  itemBrand?: string;
  itemName?: string;
  priceAsNew?: number;
  priceAsSell?: number;
  itemCondition?: string;
  priceNegotiableLevel?: string;
  shippingCoverage?: string;
  itemAddress?: ItemAddress;
  contactInfo?: ContactInfo;
}
