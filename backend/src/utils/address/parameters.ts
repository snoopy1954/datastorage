/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AddressNoID, AddressgroupNoID, Person} from '../../types/addressTypes';
import { parseString, parseNumber } from './../basicParser';

export const toNewAddress = (object: any) => {
    // console.log(object);
    const name: string = parseString(object.name.name);
    // console.log(`name='${name}'`);
    const seqnr: number = parseNumber(object.name.seqnr);
    // console.log(`seqnr='${seqnr}'`);
    const group: string = parseString(object.group);
    // console.log(`group='${group}'`);
    const zipcode: string = parseString(object.completeAddress.zipcode);
    // console.log(`zipcode='${zipcode}'`);
    const city: string = parseString(object.completeAddress.city);
    // console.log(`city='${city}'`);
    const street: string = parseString(object.completeAddress.street);
    // console.log(`street='${street}'`);
    const number: string = parseString(object.completeAddress.number);
    // console.log(`number='${number}'`);
    const persons: Person[] = parsePersonArray(object.persons);
    // console.log(`persons='${persons}'`);

    const newAddress: AddressNoID = {
        name: { name, seqnr },
        group,
        completeAddress: { zipcode, city, street, number },
        persons
    };

    // console.log(newAddress);

    return newAddress;
};

export const toNewAddressgroup = (object: any) => {
    const name = parseString(object.groupname.name);
    const seqnr = parseNumber(object.groupname.seqnr);
    const newAddressgroup: AddressgroupNoID = {
        groupname: { name, seqnr }
    };

    return newAddressgroup;
};

export const parsePersonArray = (text: any): [Person] => {

    return text;
};


