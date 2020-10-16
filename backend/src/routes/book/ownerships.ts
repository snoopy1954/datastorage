/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Ownership from '../../models/book/ownershipModel';
import { toNewOwnership } from '../../utils/bookParameters';

const ownershipsRouter = express.Router();

ownershipsRouter.get('/', async (_request, response) => {
    const ownerships = await Ownership.find({});
  
    response.json(ownerships.map(ownership => ownership.toJSON()));
});

ownershipsRouter.get('/:id', async (request, response) => {
    try {
        const ownership = await Ownership.findById(request.params.id);
        if (ownership) response.json(ownership.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

ownershipsRouter.post('/', async (request, response) => {
    try {
        const newOwnership = new Ownership(toNewOwnership(request.body));
        void await newOwnership.save();
        response.json(newOwnership);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

ownershipsRouter.delete('/:id', async (request, response) => {
    try {
        const ownership = await Ownership.findByIdAndRemove(request.params.id);
        if (ownership) response.json(ownership.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
ownershipsRouter.put('/:id', async (request, response) => {
    try {
        const newOwnership = new Ownership(toNewOwnership(request.body)); 
        const ownership = await Ownership.findByIdAndUpdate(request.params.id, newOwnership, { new: true });
        if (ownership) response.json(ownership.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default ownershipsRouter;