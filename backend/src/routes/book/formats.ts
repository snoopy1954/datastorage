/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Format from '../../models/book/formatModel';
import { toNewFormat } from '../../utils/bookParameters';

const formatsRouter = express.Router();

formatsRouter.get('/', async (_request, response) => {
    const formats = await Format.find({});
  
    response.json(formats.map(format => format.toJSON()));
});

formatsRouter.get('/:id', async (request, response) => {
    try {
        const format = await Format.findById(request.params.id);
        if (format) response.json(format.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

formatsRouter.post('/', async (request, response) => {
    try {
        const newFormat = new Format(toNewFormat(request.body));
        void await newFormat.save();
        response.json(newFormat);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

formatsRouter.delete('/:id', async (request, response) => {
    try {
        const format = await Format.findByIdAndRemove(request.params.id);
        if (format) response.json(format.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
formatsRouter.put('/:id', async (request, response) => {
    try {
        const newFormat = new Format(toNewFormat(request.body)); 
        const format = await Format.findByIdAndUpdate(request.params.id, newFormat, { new: true });
        if (format) response.json(format.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default formatsRouter;