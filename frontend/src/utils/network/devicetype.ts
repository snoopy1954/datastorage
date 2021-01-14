import { Devicetype, DevicetypeNoID } from '../../../../backend/src/types/network';

export const emptyDevicetype = (): Devicetype => {
    const devicetype: Devicetype = {
        id: '',
        name: '',
        description: ''
    };

    return devicetype;
};

export const newDevicetype = (): DevicetypeNoID => {
    const devicetype: DevicetypeNoID = {
        name: '',
        description: ''
    };

    return devicetype;
};

