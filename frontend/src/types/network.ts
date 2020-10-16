export interface Device {
    id: string;
    name: string;
    description: string;
    devicetype: string;
    networks: Network[];
    osversions: Osversion[];
    comment: string;
    createdAt: Date;
    modifiedAt: Date;
}

export type DeviceNoID = Omit<Device, "id">;

export interface Network {
    mac: string;
    ip: string;
    hostname: string;
}

export interface Os {
    id: string;
    name: string;
    versions: string[];
}

export type OsNoID = Omit<Os, "id">;

export interface Version {
    version: string;
}

export interface Osversion {
    name: string;
    supplement: string;
    version: string;
}

export interface Devicetype {
    id: string;
    name: string;
    description?: string;
}

export type DevicetypeNoID = Omit<Devicetype, "id">;
