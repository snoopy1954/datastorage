import { Group, GroupNoID } from '../../../../backend/src/types/basic';

export const newGroup = (): GroupNoID => {
    const moviegroup: GroupNoID = {
        name: "",
        seqnr: 0,
        subgroups: []
    };

    return moviegroup;
};

export const emptyGroup = (): Group => {
    const moviegroup: Group = {
        id: '',
        name: "",
        seqnr: 0,
        subgroups: []
    }
    return moviegroup;
};

