/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Recipe from '../../models/recipe/recipe';
import { toRecipe } from '../../utils/recipe';

const recipesRouter = express.Router();

recipesRouter.get('/', async (_request, response) => {
    const recipes = await Recipe.find({});
  
    response.json(recipes.map(recipe => recipe.toJSON()));
});

recipesRouter.get('/:id', async (request, response) => {
    try {
        const recipe = await Recipe.findById(request.params.id);
        if (recipe) response.json(recipe.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

recipesRouter.post('/', async (request, response) => {
    try {
        const newRecipe = new Recipe(toRecipe(request.body));
        void await newRecipe.save();
        response.json(newRecipe);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

recipesRouter.delete('/:id', async (request, response) => {
    try {
        const recipe = await Recipe.findByIdAndRemove(request.params.id);
        if (recipe) response.json(recipe.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
recipesRouter.put('/:id', async (request, response) => {
    try {
        const newRecipe = toRecipe(request.body); 
        const recipe = await Recipe.findByIdAndUpdate(request.params.id, newRecipe, { new: true });
        if (recipe) response.json(recipe.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default recipesRouter;