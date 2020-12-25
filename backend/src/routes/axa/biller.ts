/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Biller from '../../models/axa/biller';
import { toNewBiller } from '../../utils/axa';

const billersRouter = express.Router();

billersRouter.get('/', async (_request, response) => {
    const billers = await Biller.find({});
  
    response.json(billers.map(biller => biller.toJSON()));
});

billersRouter.get('/:id', async (request, response) => {
    try {
        const biller = await Biller.findById(request.params.id);
        if (biller) response.json(biller.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

billersRouter.post('/', async (request, response) => {
    try {
        const newBiller = new Biller(toNewBiller(request.body));
        void await newBiller.save();
        response.json(newBiller);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

billersRouter.delete('/:id', async (request, response) => {
    try {
        const biller = await Biller.findByIdAndRemove(request.params.id);
        if (biller) response.json(biller.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
billersRouter.put('/:id', async (request, response) => {
    try {
        const newBiller = toNewBiller(request.body); 
        const biller = await Biller.findByIdAndUpdate(request.params.id, newBiller, { new: true });
        if (biller) response.json(biller.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default billersRouter;