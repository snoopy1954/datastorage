/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Sportgroup from '../../models/sport/group';
import { toGroup } from '../../utils/basic';

const sportgroupsRouter = express.Router();

sportgroupsRouter.get('/', async (_request, response) => {
    const groups = await Sportgroup.find({});
  
    response.json(groups.map(group => group.toJSON()));
});

sportgroupsRouter.get('/:id', async (request, response) => {
    try {
        const group = await Sportgroup.findById(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

sportgroupsRouter.post('/', async (request, response) => {
    try {
        const newSportgroup = new Sportgroup(toGroup(request.body));
        void await newSportgroup.save();
        response.json(newSportgroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

sportgroupsRouter.delete('/:id', async (request, response) => {
    try {
        const group = await Sportgroup.findByIdAndRemove(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
sportgroupsRouter.put('/:id', async (request, response) => {
    try {
        const newSportgroup = toGroup(request.body); 
        const group = await Sportgroup.findByIdAndUpdate(request.params.id, newSportgroup, { new: true });
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default sportgroupsRouter;