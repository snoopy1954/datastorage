/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Address from '../../models/address/addressModel';
import { toNewAddress } from '../../utils/address/parameters';

const addresssRouter = express.Router();

addresssRouter.get('/', async (_request, response) => {
    const addresses = await Address.find({});
  
    response.json(addresses.map(address => address.toJSON()));
});

addresssRouter.get('/:id', async (request, response) => {
    try {
        const address = await Address.findById(request.params.id);
        if (address) response.json(address.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

addresssRouter.post('/', async (request, response) => {
    try {
        const newAddress = new Address(toNewAddress(request.body));
        void await newAddress.save();
        response.json(newAddress);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

addresssRouter.delete('/:id', async (request, response) => {
    try {
        const address = await Address.findByIdAndRemove(request.params.id);
        if (address) response.json(address.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
addresssRouter.put('/:id', async (request, response) => {
    try {
        const newAddress = toNewAddress(request.body); 
        const address = await Address.findByIdAndUpdate(request.params.id, newAddress, { new: true });
        if (address) response.json(address.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default addresssRouter;