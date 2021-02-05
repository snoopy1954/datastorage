import { Group, GroupNoID } from '../../../../backend/src/types/basic';

export const newGroup = (): GroupNoID => {
    const group: GroupNoID = {
        name: "",
        seqnr: 0,
        subgroups: []
    };

    return group;
};

export const emptyGroup = (): Group => {
    const group: Group = {
        id: '',
        name: "",
        seqnr: 0,
        subgroups: []
    }
    return group;
};

export const nextGroup = (groups: Group[]): GroupNoID => {
    const group: GroupNoID = {
        name: "",
        seqnr: nextSeqnr(groups),
        subgroups: []
    };

    return group;
};

export const nextSeqnr = (groups: Group[]): number => {
    let maxNumber = 0;

    Object.values(groups).forEach(group => {
        if (group.seqnr >maxNumber) maxNumber = group.seqnr;
    });
    
    return maxNumber+1;
};
  
export const sortGroups = (groups: Group[]) => {
    return groups.sort((a,b) => {
        const nameA = a.seqnr;
        const nameB = b.seqnr;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;    
    });
};

