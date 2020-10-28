/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Tongue from '../../models/book/tongue';
import { toNewTongue } from '../../utils/book/parameters';

const tonguesRouter = express.Router();

tonguesRouter.get('/', async (_request, response) => {
    const tongues = await Tongue.find({});
  
    response.json(tongues.map(tongue => tongue.toJSON()));
});

tonguesRouter.get('/:id', async (request, response) => {
    try {
        const tongue = await Tongue.findById(request.params.id);
        if (tongue) response.json(tongue.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

tonguesRouter.post('/', async (request, response) => {
    try {
        const newTongue = new Tongue(toNewTongue(request.body));
        void await newTongue.save();
        response.json(newTongue);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

tonguesRouter.delete('/:id', async (request, response) => {
    try {
        const tongue = await Tongue.findByIdAndRemove(request.params.id);
        if (tongue) response.json(tongue.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
tonguesRouter.put('/:id', async (request, response) => {
    try {
        const newTongue = new Tongue(toNewTongue(request.body)); 
        const tongue = await Tongue.findByIdAndUpdate(request.params.id, newTongue, { new: true });
        if (tongue) response.json(tongue.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default tonguesRouter;