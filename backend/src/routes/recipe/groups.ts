/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Recipegroup from '../../models/recipe/group';
import { toGroup } from '../../utils/basic';


const recipegroupsRouter = express.Router();

recipegroupsRouter.get('/', async (_request, response) => {
    const groups = await Recipegroup.find({});
  
    response.json(groups.map(group => group.toJSON()));
});

recipegroupsRouter.get('/:id', async (request, response) => {
    try {
        const group = await Recipegroup.findById(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

recipegroupsRouter.post('/', async (request, response) => {
    try {
        const newRecipegroup = new Recipegroup(toGroup(request.body));
        void await newRecipegroup.save();
        response.json(newRecipegroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

recipegroupsRouter.delete('/:id', async (request, response) => {
    try {
        const group = await Recipegroup.findByIdAndRemove(request.params.id);
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
recipegroupsRouter.put('/:id', async (request, response) => {
    try {
        const newRecipegroup = toGroup(request.body); 
        const group = await Recipegroup.findByIdAndUpdate(request.params.id, newRecipegroup, { new: true });
        if (group) response.json(group.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default recipegroupsRouter;