import { Address, AddressNoID, Addressgroup, AddressgroupNoID, Person } from '../../../backend/src/types/address';

const sortAddresssgroup = (a: Addressgroup, b: Addressgroup) => {
    const nameA = a.groupname.seqnr;
    const nameB = b.groupname.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

export const sortAddressgroupList = (addressgroups: Addressgroup[]) => {
    const addressgroupListSorted = addressgroups.sort(sortAddresssgroup);
        
    return addressgroupListSorted;
};

const sortAddresses = (a: Address, b: Address) => {
    const nameA = a.name.seqnr;
    const nameB = b.name.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

export const sortAddressList = (addresss: Address[], addressgroups: Addressgroup[]) => {
    let addressListSorted: Address[] = [];
    let sortedAddressgroup;

    addressgroups.forEach(addressgroup => {
        sortedAddressgroup = [];
            sortedAddressgroup = addresss.filter(address => address.group===addressgroup.groupname.name);
            addressListSorted = addressListSorted.concat(sortedAddressgroup.sort(sortAddresses));
    });
        
    return addressListSorted;
};

export const newPerson = (): Person => {
    const person = {
        nickname: '',
        givenname: '',
        familyname: '',
        birthday: '',
        communication: {
            phone: '',
            mobile: '',
            email: '',
            web: '',
        },
        comment: ''
    };

    return person;
};

export const newAddress = (): AddressNoID => {
    const address: AddressNoID = {
        name: {
            name: '',
            seqnr: 0
        },
        group: '',
        completeAddress: {
            zipcode: '',
            city: '',
            street: '',
            number: ''
        },
        persons: []
    };

    address.persons.push(newPerson());

    return address;
};

export const newAddressgroup = (): AddressgroupNoID => {
    const addressgroup = {
        groupname: {
            name: '',
            seqnr: 0
        }
    };

    return addressgroup;
};

export const addresslistTitle = (group: string): string => {
    const filter = (group!=="") ? ': ' + group : '';

    return filter;
}

export const addresslistFilter = (addresses: Address[], group: string, addressgroups: Addressgroup[]): Address[] => {

    const filteredAddresses = (group!=="") ? Object.values(addresses).filter(address => address.group===group) : addresses;
    const sortedAddresses = sortAddressList(Object.values(filteredAddresses), Object.values(addressgroups));

    return sortedAddresses;
}

