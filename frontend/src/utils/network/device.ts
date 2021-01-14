import { Device, DeviceNoID } from '../../../../backend/src/types/network';

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
};

export const emptyDevice = (): Device => {

    const device: Device = {
        id: '',
        name: "",
        description: "",
        devicetype: "",
        networks: [],
        osversions: [],
        comment: "",
        createdAt: new Date(),
        modifiedAt: new Date()  
    };

    return device;
};

export const newDevice = (): DeviceNoID => {

    const device: DeviceNoID = {
        name: "",
        description: "",
        devicetype: "",
        networks: [{
          hostname: "",
          mac: "",
          ip: ""
        }],
        osversions: [{
          name: "",
          supplement: "",
          version: ""
        }],
        comment: "",
        createdAt: new Date(),
        modifiedAt: new Date()  
    };

    return device;
};
