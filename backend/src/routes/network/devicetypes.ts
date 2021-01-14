/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Devicetype from '../../models/network/devicetype';
import { toNewDevicetype } from '../../utils/network';

const devicetypesRouter = express.Router();

devicetypesRouter.get('/', async (_request, response) => {
    const devicetypes = await Devicetype.find({});
  
    response.json(devicetypes.map(devicetype => devicetype.toJSON()));
});

devicetypesRouter.get('/:id', async (request, response) => {
    try {
        const devicetype = await Devicetype.findById(request.params.id);
        if (devicetype) response.json(devicetype.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

devicetypesRouter.post('/', async (request, response) => {
    try {
        const newDevicetype = new Devicetype(toNewDevicetype(request.body));
        void await newDevicetype.save();
        response.json(newDevicetype);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

devicetypesRouter.delete('/:id', async (request, response) => {
    try {
        const devicetype = await Devicetype.findByIdAndRemove(request.params.id);
        if (devicetype) response.json(devicetype.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
devicetypesRouter.put('/:id', async (request, response) => {
    try {
        const newDevicetype = new Devicetype(toNewDevicetype(request.body)); 
        const devicetype = await Devicetype.findByIdAndUpdate(request.params.id, newDevicetype, { new: true });
        if (devicetype) response.json(devicetype.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default devicetypesRouter;