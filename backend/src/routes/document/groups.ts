/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Documentgroup from '../../models/document/group';
import { toGroup } from '../../utils/basic';

const documentgroupsRouter = express.Router();

documentgroupsRouter.get('/', async (_request, response) => {
    const groups = await Documentgroup.find({});
  
    response.json(groups.map(group => group.toJSON()));
});

documentgroupsRouter.get('/:id', async (request, response) => {
    try {
        const group = await Documentgroup.findById(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

documentgroupsRouter.post('/', async (request, response) => {
    try {
        const newDocumentgroup = new Documentgroup(toGroup(request.body));
        void await newDocumentgroup.save();
        response.json(newDocumentgroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

documentgroupsRouter.delete('/:id', async (request, response) => {
    try {
        const group = await Documentgroup.findByIdAndRemove(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
documentgroupsRouter.put('/:id', async (request, response) => {
    try {
        const newDocumentgroup = toGroup(request.body); 
        const group = await Documentgroup.findByIdAndUpdate(request.params.id, newDocumentgroup, { new: true });
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default documentgroupsRouter;