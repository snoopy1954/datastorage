/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Year from '../../models/account/year';
import { toYear } from '../../utils/basic';

const accountyearsRouter = express.Router();

accountyearsRouter.get('/', async (_request, response) => {
    const accountyears = await Year.find({});
  
    response.json(accountyears.map(accountyear => accountyear.toJSON()));
});

accountyearsRouter.get('/:id', async (request, response) => {
    try {
        const accountyear = await Year.findById(request.params.id);
        if (accountyear) response.json(accountyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accountyearsRouter.post('/', async (request, response) => {
    try {
        const newYear = new Year(toYear(request.body));
        void await newYear.save();
        response.json(newYear);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accountyearsRouter.delete('/:id', async (request, response) => {
    try {
        const accountyear = await Year.findByIdAndRemove(request.params.id);
        if (accountyear) response.json(accountyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
accountyearsRouter.put('/:id', async (request, response) => {
    try {
        const newYear = toYear(request.body); 
        const accountyear = await Year.findByIdAndUpdate(request.params.id, newYear, { new: true });
        if (accountyear) response.json(accountyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default accountyearsRouter;