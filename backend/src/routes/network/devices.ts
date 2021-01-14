/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Device from '../../models/network/device';
import { toNewDevice } from '../../utils/network';

const devicesRouter = express.Router();

devicesRouter.get('/', async (_request, response) => {
    const devices = await Device.find({});
  
    response.json(devices.map(device => device.toJSON()));
});

devicesRouter.get('/:id', async (request, response) => {
    try {
        const device = await Device.findById(request.params.id);
        if (device) response.json(device.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

devicesRouter.post('/', async (request, response) => {
    try {
        const newDevice = new Device(toNewDevice(request.body));
        void await newDevice.save();
        response.json(newDevice);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

devicesRouter.delete('/:id', async (request, response) => {
    try {
        const device = await Device.findByIdAndRemove(request.params.id);
        if (device) response.json(device.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

devicesRouter.put('/:id', async (request, response) => {
    try {
        const newDevice = toNewDevice(request.body);
        const updatedDevice = await Device.findByIdAndUpdate(request.params.id, newDevice);
        if (updatedDevice) {
            response.json(updatedDevice.toJSON());
        }
        else {
            response.status(400).send('update failed');
        }
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default devicesRouter;