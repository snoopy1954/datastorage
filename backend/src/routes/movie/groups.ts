/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Group from '../../models/movie/group';
import { toGroup } from '../../utils/basic';

const groupsRouter = express.Router();

groupsRouter.get('/', async (_request, response) => {
    const groups = await Group.find({});
  
    response.json(groups.map(group => group.toJSON()));
});

groupsRouter.get('/:id', async (request, response) => {
    try {
        const group = await Group.findById(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

groupsRouter.post('/', async (request, response) => {
    try {
        const newGroup = new Group(toGroup(request.body));
        void await newGroup.save();
        response.json(newGroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

groupsRouter.delete('/:id', async (request, response) => {
    try {
        const group = await Group.findByIdAndRemove(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
groupsRouter.put('/:id', async (request, response) => {
    try {
        const newGroup = toGroup(request.body); 
        const group = await Group.findByIdAndUpdate(request.params.id, newGroup, { new: true });
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default groupsRouter;