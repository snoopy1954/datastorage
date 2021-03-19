import { Address, AddressNoID, Person } from '../../../../backend/src/types/address';
import { Group } from '../../../../backend/src/types/basic';


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

export const sortAddressList = (addresss: Address[], groups: Group[]) => {
    let addressListSorted: Address[] = [];
    let sortedGroup;

    groups.forEach(group => {
        sortedGroup = [];
            sortedGroup = addresss.filter(address => address.group===group.name);
            addressListSorted = addressListSorted.concat(sortedGroup.sort(sortAddresses));
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

export const emptyAddress = (): Address => {
    const address: Address = {
        id: '',
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

    return address;
};

export const addresslistTitle = (group: string): string => {
    const filter = (group!=="") ? ' - ' + group : '';

    return filter;
}

export const addresslistFilter = (addresses: Address[], group: string, groups: Group[]): Address[] => {

    const filteredAddresses = (group!=="") ? Object.values(addresses).filter(address => address.group===group) : addresses;
    const sortedAddresses = sortAddressList(Object.values(filteredAddresses), Object.values(groups));

    return sortedAddresses;
}

