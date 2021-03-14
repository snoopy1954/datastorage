/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Year from '../../models/document/year';
import { toYear } from '../../utils/basic';

const documentyearsRouter = express.Router();

documentyearsRouter.get('/', async (_request, response) => {
    const documentyears = await Year.find({});
  
    response.json(documentyears.map(documentyear => documentyear.toJSON()));
});

documentyearsRouter.get('/:id', async (request, response) => {
    try {
        const documentyear = await Year.findById(request.params.id);
        if (documentyear) response.json(documentyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

documentyearsRouter.post('/', async (request, response) => {
    try {
        const newYear = new Year(toYear(request.body));
        void await newYear.save();
        response.json(newYear);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

documentyearsRouter.delete('/:id', async (request, response) => {
    try {
        const documentyear = await Year.findByIdAndRemove(request.params.id);
        if (documentyear) response.json(documentyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
documentyearsRouter.put('/:id', async (request, response) => {
    try {
        const newYear = toYear(request.body); 
        const documentyear = await Year.findByIdAndUpdate(request.params.id, newYear, { new: true });
        if (documentyear) response.json(documentyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default documentyearsRouter;