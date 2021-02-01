/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Transaction from '../../models/account/transaction';
import { toTransaction } from '../../utils/account';

const transactionsRouter = express.Router();

transactionsRouter.get('/', async (_request, response) => {
    const transactions = await Transaction.find({});
  
    response.json(transactions.map(transaction => transaction.toJSON()));
});

transactionsRouter.get('/:id', async (request, response) => {
    try {
        const transaction = await Transaction.findById(request.params.id);
        if (transaction) response.json(transaction.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

transactionsRouter.post('/', async (request, response) => {
    try {
        const newTransaction = new Transaction(toTransaction(request.body));
        void await newTransaction.save();
        response.json(newTransaction);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

transactionsRouter.delete('/:id', async (request, response) => {
    try {
        const transaction = await Transaction.findByIdAndRemove(request.params.id);
        if (transaction) response.json(transaction.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
transactionsRouter.put('/:id', async (request, response) => {
    try {
        const newTransaction = toTransaction(request.body); 
        const transaction = await Transaction.findByIdAndUpdate(request.params.id, newTransaction, { new: true });
        if (transaction) response.json(transaction.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default transactionsRouter;