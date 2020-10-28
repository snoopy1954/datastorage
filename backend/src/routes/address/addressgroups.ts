/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Addressgroup from '../../models/address/addressgroup';
import { toNewAddressgroup } from '../../utils/address/parameters';

const addressgroupsRouter = express.Router();

addressgroupsRouter.get('/', async (_request, response) => {
    const addressgroups = await Addressgroup.find({});
  
    response.json(addressgroups.map(addressgroup => addressgroup.toJSON()));
});

addressgroupsRouter.get('/:id', async (request, response) => {
    try {
        const addressgroup = await Addressgroup.findById(request.params.id);
        if (addressgroup) response.json(addressgroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

addressgroupsRouter.post('/', async (request, response) => {
    try {
        const newAddressgroup = new Addressgroup(toNewAddressgroup(request.body));
        void await newAddressgroup.save();
        response.json(newAddressgroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

addressgroupsRouter.delete('/:id', async (request, response) => {
    try {
        const addressgroup = await Addressgroup.findByIdAndRemove(request.params.id);
        if (addressgroup) response.json(addressgroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
addressgroupsRouter.put('/:id', async (request, response) => {
    try {
        const newAddressgroup = toNewAddressgroup(request.body); 
        const addressgroup = await Addressgroup.findByIdAndUpdate(request.params.id, newAddressgroup, { new: true });
        if (addressgroup) response.json(addressgroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default addressgroupsRouter;