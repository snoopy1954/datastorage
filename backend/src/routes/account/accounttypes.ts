/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Accounttype from '../../models/account/accounttype';
import { toAccounttype } from '../../utils/account';

const accounttypesRouter = express.Router();

accounttypesRouter.get('/', async (_request, response) => {
    const accounttypes = await Accounttype.find({});
  
    response.json(accounttypes.map(accounttype => accounttype.toJSON()));
});

accounttypesRouter.get('/:id', async (request, response) => {
    try {
        const accounttype = await Accounttype.findById(request.params.id);
        if (accounttype) response.json(accounttype.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accounttypesRouter.post('/', async (request, response) => {
    try {
        const newAccounttype = new Accounttype(toAccounttype(request.body));
        void await newAccounttype.save();
        response.json(newAccounttype);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accounttypesRouter.delete('/:id', async (request, response) => {
    try {
        const accounttype = await Accounttype.findByIdAndRemove(request.params.id);
        if (accounttype) response.json(accounttype.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
accounttypesRouter.put('/:id', async (request, response) => {
    try {
        const newAccounttype = toAccounttype(request.body); 
        const accounttype = await Accounttype.findByIdAndUpdate(request.params.id, newAccounttype, { new: true });
        if (accounttype) response.json(accounttype.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default accounttypesRouter;