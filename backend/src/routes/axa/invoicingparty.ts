/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Invoicingparty from '../../models/axa/invoicingparty';
import { toNewInvoicingparty } from '../../utils/axa';

const invoicingpartiesRouter = express.Router();

invoicingpartiesRouter.get('/', async (_request, response) => {
    const invoicingparties = await Invoicingparty.find({});
  
    response.json(invoicingparties.map(invoicingparty => invoicingparty.toJSON()));
});

invoicingpartiesRouter.get('/:id', async (request, response) => {
    try {
        const invoicingparty = await Invoicingparty.findById(request.params.id);
        if (invoicingparty) response.json(invoicingparty.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

invoicingpartiesRouter.post('/', async (request, response) => {
    try {
        const newInvoicingparty = new Invoicingparty(toNewInvoicingparty(request.body));
        void await newInvoicingparty.save();
        response.json(newInvoicingparty);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

invoicingpartiesRouter.delete('/:id', async (request, response) => {
    try {
        const invoicingparty = await Invoicingparty.findByIdAndRemove(request.params.id);
        if (invoicingparty) response.json(invoicingparty.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
invoicingpartiesRouter.put('/:id', async (request, response) => {
    try {
        const newInvoicingparty = toNewInvoicingparty(request.body); 
        const invoicingparty = await Invoicingparty.findByIdAndUpdate(request.params.id, newInvoicingparty, { new: true });
        if (invoicingparty) response.json(invoicingparty.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default invoicingpartiesRouter;