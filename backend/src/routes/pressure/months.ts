/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Month from '../../models/pressure/month';
import { toNewMonth } from '../../utils/pressure/parameters';


const monthsRouter = express.Router();

monthsRouter.get('/', async (_request, response) => {
    const months = await Month.find({});
  
    response.json(months.map(month => month.toJSON()));
});

monthsRouter.get('/:id', async (request, response) => {
    try {
        const month = await Month.findById(request.params.id);
        if (month) response.json(month.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

monthsRouter.post('/', async (request, response) => {
    try {
        const newMonth = new Month(toNewMonth(request.body));
        void await newMonth.save();
        response.json(newMonth);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

monthsRouter.delete('/:id', async (request, response) => {
    try {
        const month = await Month.findByIdAndRemove(request.params.id);
        if (month) response.json(month.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

monthsRouter.put('/:id', async (request, response) => {
    try {
        const newMonth = toNewMonth(request.body);
        const updatedMonth = await Month.findByIdAndUpdate(request.params.id, newMonth);
        if (updatedMonth) {
            response.json(updatedMonth.toJSON());
        }
        else {
            response.status(400).send('update failed');
        }
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default monthsRouter;