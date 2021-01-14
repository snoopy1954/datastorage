import { Os, OsNoID } from '../../../../backend/src/types/network';

export const sortOsList = (osList: Os[]) => {
    const sortedOsList: Os[] = osList.map(os => {
      const sortedVersions = os.versions.length > 1 
        ? os.versions.sort(function(a,b) {
            const nameA = a.toUpperCase();
            const nameB = b.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        : os.versions;
        os.versions = sortedVersions.reverse();

        return os;
    });

    return sortedOsList;
};

export const emptyOs = (): Os => {
    const os: Os = {
        id: '',
        name: '',
        description: '',
        versions: []
    };

    return os;
};

export const newOs = (): OsNoID => {
    const os: OsNoID = {
        name: '',
        description: '',
        versions: []
    };

    return os;
};

