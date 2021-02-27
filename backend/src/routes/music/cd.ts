/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Cd from '../../models/music/cd';
import { toCd } from '../../utils/music';

const cdRouter = express.Router();

cdRouter.get('/', async (_request, response) => {
    const cds = await Cd.find({});
  
    response.json(cds.map(cd => cd.toJSON()));
});

cdRouter.get('/:id', async (request, response) => {
    try {
        const cd = await Cd.findById(request.params.id);
        if (cd) response.json(cd.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

cdRouter.post('/', async (request, response) => {
    try {
        const newCd = new Cd(toCd(request.body));
        void await newCd.save();
        response.json(newCd);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

cdRouter.delete('/:id', async (request, response) => {
    try {
        const cd = await Cd.findByIdAndRemove(request.params.id);
        if (cd) response.json(cd.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
cdRouter.put('/:id', async (request, response) => {
    try {
        const newCd = toCd(request.body); 
        const cd = await Cd.findByIdAndUpdate(request.params.id, newCd, { new: true });
        if (cd) response.json(cd.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default cdRouter;