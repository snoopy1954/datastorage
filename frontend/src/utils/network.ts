import { Device, Os } from '../../../backend/src/types/network';

export const sortDeviceList = (deviceList: Device[]) => {
    const sortedDeviceList = deviceList.sort(function(a,b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedDeviceList;
}

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
}