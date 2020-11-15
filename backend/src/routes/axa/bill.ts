/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Bill from '../../models/axa/bill';
import { toNewBill } from '../../utils/axa';

const billsRouter = express.Router();

billsRouter.get('/', async (_request, response) => {
    const bills = await Bill.find({});
  
    response.json(bills.map(bill => bill.toJSON()));
});

billsRouter.get('/:id', async (request, response) => {
    try {
        const bill = await Bill.findById(request.params.id);
        if (bill) response.json(bill.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

billsRouter.post('/', async (request, response) => {
    try {
        const newBill = new Bill(toNewBill(request.body));
        void await newBill.save();
        response.json(newBill);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

billsRouter.delete('/:id', async (request, response) => {
    try {
        const bill = await Bill.findByIdAndRemove(request.params.id);
        if (bill) response.json(bill.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
billsRouter.put('/:id', async (request, response) => {
    try {
        const newBill = toNewBill(request.body); 
        const bill = await Bill.findByIdAndUpdate(request.params.id, newBill, { new: true });
        if (bill) response.json(bill.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default billsRouter;