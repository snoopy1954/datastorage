/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeviceNoID, DevicetypeNoID, OsNoID, Osversion, Network } from '../../types/network';

export const toNewDevicetype = (object: any) => {
    const name = parseString(object.name);
    const description = parseStringOptional(object.description);

    const newDevicetype: DevicetypeNoID = {
        name,
        description
    };

    return newDevicetype;
};

export const toNewOs = (object: any): OsNoID => {
    const name: string = parseString(object.name);
    const versions: string[] = parseVersion(object.versions);
    const description = parseStringOptional(object.description);

    const newOs: OsNoID = {
        name,
        versions,
        description
    };

    return newOs;
};

export const toNewDevice = (object: any): DeviceNoID => {
    const name = parseString(object.name);
    const description = parseString(object.description);
    const devicetype = parseString(object.devicetype);
    const networks = parseNetworks(object.networks);
    const osversions = parseOsversions(object.osversions);
    const comment = parseStringOptional(object.comment);
    const createdAt = parseDate(object.createdAt);
    const modifiedAt = parseDate(object.modifiedAt);

    const newDevice: DeviceNoID = {
        name,
        description,
        devicetype,
        networks,
        osversions,
        comment,
        createdAt,
        modifiedAt
    };

    return newDevice;
};

const parseOsversions = (osversions: any): Osversion[] => {

    if (!osversions || !Array.isArray(osversions) || osversions.length < 1) {
        throw new Error(`Missing parameter: ${osversions}`);  
    }

    osversions.forEach(osversion => {
        if (!osversion.name || !isString(osversion.name) || !osversion.version || !isString(osversion.version)) {
            throw new Error(`Incorrect parameter: ${osversions}`);  
        }

        if (osversion.supplement) {
            if (!isString(osversion.supplement)) {
                throw new Error(`Incorrect parameter: ${osversions}`);  
            }    
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return osversions;
};

const parseNetworks = (networks: any): Network[] => {

    if (!networks || !Array.isArray(networks) || networks.length < 1) {
        throw new Error(`Missing parameter: ${networks}`);  
    }

    networks.forEach(network => {
        if (!network.mac || !isString(network.mac) || !network.ip || !isString(network.ip) || !network.hostname || !isString(network.hostname)) {
            throw new Error(`Incorrect parameter: ${networks}`);  
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return networks;
};

const parseVersion = (versions: any): string[] => {
    if (!versions) {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return versions;
};

const parseString = (text: any): string => {
    if (!text || !isString(text)) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

const parseDate = (text: any): Date => {
    if (!text) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return text;
};

const parseStringOptional = (text: any): string => {

    if (!text) return '';

    if (!isString(text)) {
      throw new Error(`Incorrect parameter: ${text}`);
    }
  
    return text;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
