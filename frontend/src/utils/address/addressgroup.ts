import { Addressgroup, AddressgroupNoID } from '../../../../backend/src/types/address';

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

export const emptyAddressgroup = (): Addressgroup => {
    const addressgroup: Addressgroup = {
        id: '',
        groupname: {
            name: '',
            seqnr: 0
        },
        comment: ''
    };

    return addressgroup;
};

export const newAddressgroup = (): AddressgroupNoID => {
    const addressgroup: AddressgroupNoID = {
        groupname: {
            name: '',
            seqnr: 0
        },
        comment: ''
    };

    return addressgroup;
};


