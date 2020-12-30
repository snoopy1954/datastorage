export interface Name {
    seqnr: number;
    name: string;
}

export interface Addressgroup {
    id: string;
    groupname: Name;
}

export type AddressgroupNoID = Omit<Addressgroup, 'id'>;

export interface Communication {
    phone: string;
    mobile: string;
    email: string;
    web: string;
}

export interface Person {
    nickname: string;
    givenname: string;
    familyname: string;
    birthday: string;
    communication: Communication;
    comment: string;
}

export interface CompleteAddress {
    zipcode: string;
    city: string;
    street: string;
    number: string;
}

export interface Address {
    id: string;
    name: Name;
    group: string;
    completeAddress: CompleteAddress;  
    persons: Person[];
}

export type AddressNoID = Omit<Address, 'id'>;
