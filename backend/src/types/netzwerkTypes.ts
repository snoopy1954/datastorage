export interface Network {
    mac: string;
    ip: string;
    hostname: string;
}

export interface Osversion {
    name: string;
    supplement?: string;
    version: string;
}

export interface Device {
    id: string;
    name: string;
    description: string;
    devicetype: string;
    networks: Network[];
    osversions: Osversion[];
    comment: string;
    createdAt: string;
    modifiedAt: string;
}

export type DeviceNoID = Omit<Device, 'id'>;

export interface Devicetype {
    id: string;
    name: string;
    description?: string
}

export type DevicetypeNoID = Omit<Devicetype, 'id'>;

export interface Os {
    id: string;
    name: string;
    versions: string[];
}

export type OsNoID = Omit<Os, 'id'>;
