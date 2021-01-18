/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Logline from '../../models/logging/logline';
import { toNewLogline } from '../../utils/logging';

const loglinesRouter = express.Router();

loglinesRouter.get('/', async (_request, response) => {
    const loglines = await Logline.find({});
  
    response.json(loglines.map(logline => logline.toJSON()));
});

loglinesRouter.get('/:id', async (request, response) => {
    try {
        const logline = await Logline.findById(request.params.id);
        if (logline) response.json(logline.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

loglinesRouter.post('/', async (request, response) => {
    try {
        const newLogline = new Logline(toNewLogline(request.body));
        void await newLogline.save();
        response.json(newLogline);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

loglinesRouter.delete('/:id', async (request, response) => {
    try {
        const logline = await Logline.findByIdAndRemove(request.params.id);
        if (logline) response.json(logline.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
loglinesRouter.put('/:id', async (request, response) => {
    try {
        const newLogline = toNewLogline(request.body); 
        const logline = await Logline.findByIdAndUpdate(request.params.id, newLogline, { new: true });
        if (logline) response.json(logline.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default loglinesRouter;