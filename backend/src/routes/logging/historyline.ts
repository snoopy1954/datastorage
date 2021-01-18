/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Historyline from '../../models/logging/historyline';
import { toNewHistoryline } from '../../utils/logging';

const historylinesRouter = express.Router();

historylinesRouter.get('/', async (_request, response) => {
    const historylines = await Historyline.find({});
  
    response.json(historylines.map(historyline => historyline.toJSON()));
});

historylinesRouter.get('/:id', async (request, response) => {
    try {
        const historyline = await Historyline.findById(request.params.id);
        if (historyline) response.json(historyline.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

historylinesRouter.post('/', async (request, response) => {
    try {
        const newHistoryline = new Historyline(toNewHistoryline(request.body));
        void await newHistoryline.save();
        response.json(newHistoryline);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

historylinesRouter.delete('/:id', async (request, response) => {
    try {
        const historyline = await Historyline.findByIdAndRemove(request.params.id);
        if (historyline) response.json(historyline.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
historylinesRouter.put('/:id', async (request, response) => {
    try {
        const newHistoryline = toNewHistoryline(request.body); 
        const historyline = await Historyline.findByIdAndUpdate(request.params.id, newHistoryline, { new: true });
        if (historyline) response.json(historyline.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default historylinesRouter;