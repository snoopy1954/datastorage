/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Musicgroup from '../../models/music/group';
import { toGroup } from '../../utils/basic';

const musicgroupRouter = express.Router();

musicgroupRouter.get('/', async (_request, response) => {
    const groups = await Musicgroup.find({});
  
    response.json(groups.map(group => group.toJSON()));
});

musicgroupRouter.get('/:id', async (request, response) => {
    try {
        const group = await Musicgroup.findById(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

musicgroupRouter.post('/', async (request, response) => {
    try {
        const newMusicgroup = new Musicgroup(toGroup(request.body));
        void await newMusicgroup.save();
        response.json(newMusicgroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

musicgroupRouter.delete('/:id', async (request, response) => {
    try {
        const group = await Musicgroup.findByIdAndRemove(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
musicgroupRouter.put('/:id', async (request, response) => {
    try {
        const newMusicgroup = toGroup(request.body); 
        const group = await Musicgroup.findByIdAndUpdate(request.params.id, newMusicgroup, { new: true });
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default musicgroupRouter;