
export class ItemAddress {
  street: string;
  city: string;
  state: string;
  zipcode: number;

  constructor(address: {
    street?: string,
    city?: string,
    state?: string,
    zipcode?: number
  } = {}) {
    this.street = address.street || '';
    this.city = address.city || '';
    this.state = address.state || '';
    this.zipcode = address.zipcode || -1;
  }
}