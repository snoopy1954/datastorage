/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import Year from '../../models/axa/year';
import { toYear } from '../../utils/axa';

const axayearsRouter = express.Router();

axayearsRouter.get('/', async (_request, response) => {
    const years = await Year.find({});
  
    response.json(years.map(year => year.toJSON()));
});

axayearsRouter.get('/:id', async (request, response) => {
    try {
        const year = await Year.findById(request.params.id);
        if (year) response.json(year.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

axayearsRouter.post('/', async (request, response) => {
    try {
        const newYear = new Year(toYear(request.body));
        void await newYear.save();
        response.json(newYear);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

axayearsRouter.delete('/:id', async (request, response) => {
    try {
        const year = await Year.findByIdAndRemove(request.params.id);
        if (year) response.json(year.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
axayearsRouter.put('/:id', async (request, response) => {
    try {
        const newYear = toYear(request.body); 
        const year = await Year.findByIdAndUpdate(request.params.id, newYear, { new: true });
        if (year) response.json(year.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default axayearsRouter;