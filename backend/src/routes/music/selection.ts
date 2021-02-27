/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Selection from '../../models/music/selection';
import { toSelection } from '../../utils/music';

const selectionRouter = express.Router();

selectionRouter.get('/', async (_request, response) => {
    const selections = await Selection.find({});
  
    response.json(selections.map(selection => selection.toJSON()));
});

selectionRouter.get('/:id', async (request, response) => {
    try {
        const selection = await Selection.findById(request.params.id);
        if (selection) response.json(selection.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

selectionRouter.post('/', async (request, response) => {
    try {
        const newSelection = new Selection(toSelection(request.body));
        void await newSelection.save();
        response.json(newSelection);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

selectionRouter.delete('/:id', async (request, response) => {
    try {
        const selection = await Selection.findByIdAndRemove(request.params.id);
        if (selection) response.json(selection.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
selectionRouter.put('/:id', async (request, response) => {
    try {
        const newSelection = toSelection(request.body); 
        const selection = await Selection.findByIdAndUpdate(request.params.id, newSelection, { new: true });
        if (selection) response.json(selection.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default selectionRouter;