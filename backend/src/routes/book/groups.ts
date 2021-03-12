/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Bookgroup from '../../models/book/bookgroup';
import { toGroup } from '../../utils/basic';


const bookgroupsRouter = express.Router();

bookgroupsRouter.get('/', async (_request, response) => {
    const bookgroups = await Bookgroup.find({});
  
    response.json(bookgroups.map(bookgroup => bookgroup.toJSON()));
});

bookgroupsRouter.get('/:id', async (request, response) => {
    try {
        const bookgroup = await Bookgroup.findById(request.params.id);
        if (bookgroup) response.json(bookgroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

bookgroupsRouter.post('/', async (request, response) => {
    try {
        const newBookgroup = new Bookgroup(toGroup(request.body));
        void await newBookgroup.save();
        response.json(newBookgroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

bookgroupsRouter.delete('/:id', async (request, response) => {
    try {
        const bookgroup = await Bookgroup.findByIdAndRemove(request.params.id);
        if (bookgroup) response.json(bookgroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
bookgroupsRouter.put('/:id', async (request, response) => {
    try {
        const newBookgroup = toGroup(request.body); 
        const bookgroup = await Bookgroup.findByIdAndUpdate(request.params.id, newBookgroup, { new: true });
        if (bookgroup) response.json(bookgroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default bookgroupsRouter;