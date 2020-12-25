/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Account from '../../models/axa/account';
import { toNewAccount } from '../../utils/axa';

const accountsRouter = express.Router();

accountsRouter.get('/', async (_request, response) => {
    const accounts = await Account.find({});
  
    response.json(accounts.map(account => account.toJSON()));
});

accountsRouter.get('/:id', async (request, response) => {
    try {
        const account = await Account.findById(request.params.id);
        if (account) response.json(account.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

accountsRouter.post('/', async (request, response) => {
    try {
        const newAccount = new Account(toNewAccount(request.body));
        void await newAccount.save();
        response.json(newAccount);
    } catch (e) {
        console.log(e.message);
        response.status(400).send(e.message);
    }
});

accountsRouter.delete('/:id', async (request, response) => {
    try {
        const account = await Account.findByIdAndRemove(request.params.id);
        if (account) response.json(account.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
accountsRouter.put('/:id', async (request, response) => {
    try {
        const newAccount = toNewAccount(request.body); 
        const account = await Account.findByIdAndUpdate(request.params.id, newAccount, { new: true });
        if (account) response.json(account.toJSON());
        else response.status(404).end();
    } catch (e) {
        console.log(e.message);
        response.status(400).send(e.message);
    }
});

export default accountsRouter;