/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Year from '../../models/sport/sportyear';
import { toYear } from '../../utils/basic';

const sportyearsRouter = express.Router();

sportyearsRouter.get('/', async (_request, response) => {
    const sportyears = await Year.find({});
  
    response.json(sportyears.map(sportyear => sportyear.toJSON()));
});

sportyearsRouter.get('/:id', async (request, response) => {
    try {
        const sportyear = await Year.findById(request.params.id);
        if (sportyear) response.json(sportyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

sportyearsRouter.post('/', async (request, response) => {
    try {
        const newYear = new Year(toYear(request.body));
        void await newYear.save();
        response.json(newYear);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

sportyearsRouter.delete('/:id', async (request, response) => {
    try {
        const sportyear = await Year.findByIdAndRemove(request.params.id);
        if (sportyear) response.json(sportyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
sportyearsRouter.put('/:id', async (request, response) => {
    try {
        const newYear = toYear(request.body); 
        const sportyear = await Year.findByIdAndUpdate(request.params.id, newYear, { new: true });
        if (sportyear) response.json(sportyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default sportyearsRouter;