/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import Year from '../../models/axa/year';
import { toNewYear } from '../../utils/axa';

const yearsRouter = express.Router();

yearsRouter.get('/', async (_request, response) => {
    const years = await Year.find({});
  
    response.json(years.map(year => year.toJSON()));
});

yearsRouter.get('/:id', async (request, response) => {
    try {
        const year = await Year.findById(request.params.id);
        if (year) response.json(year.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

yearsRouter.post('/', async (request, response) => {
    try {
        const newYear = new Year(toNewYear(request.body));
        void await newYear.save();
        response.json(newYear);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

yearsRouter.delete('/:id', async (request, response) => {
    try {
        const year = await Year.findByIdAndRemove(request.params.id);
        if (year) response.json(year.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
yearsRouter.put('/:id', async (request, response) => {
    try {
        const newYear = toNewYear(request.body); 
        const year = await Year.findByIdAndUpdate(request.params.id, newYear, { new: true });
        if (year) response.json(year.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default yearsRouter;