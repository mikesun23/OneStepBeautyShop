export class ContactInfo {
    contactType: string;
    accountNumber: string;

    constructor(contact: {
        contactType?: string,
        accountNumber?: string
    } = {}) {
        this.contactType = contact.contactType || '';
        this.accountNumber = contact.accountNumber || '';
    }
}
