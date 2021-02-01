/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Accountyear from '../../models/account/accountyear';
import { toAccountyear } from '../../utils/account';

const accountyearsRouter = express.Router();

accountyearsRouter.get('/', async (_request, response) => {
    const accountyears = await Accountyear.find({});
  
    response.json(accountyears.map(accountyear => accountyear.toJSON()));
});

accountyearsRouter.get('/:id', async (request, response) => {
    try {
        const accountyear = await Accountyear.findById(request.params.id);
        if (accountyear) response.json(accountyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accountyearsRouter.post('/', async (request, response) => {
    try {
        const newAccountyear = new Accountyear(toAccountyear(request.body));
        void await newAccountyear.save();
        response.json(newAccountyear);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accountyearsRouter.delete('/:id', async (request, response) => {
    try {
        const accountyear = await Accountyear.findByIdAndRemove(request.params.id);
        if (accountyear) response.json(accountyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
accountyearsRouter.put('/:id', async (request, response) => {
    try {
        const newAccountyear = toAccountyear(request.body); 
        const accountyear = await Accountyear.findByIdAndUpdate(request.params.id, newAccountyear, { new: true });
        if (accountyear) response.json(accountyear.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default accountyearsRouter;