import { Recipe, RecipeNoID } from '../../../../../backend/src/types/recipe';
import { 
    SET_RECIPES, 
    ADD_RECIPE,
    UPDATE_RECIPE,
    REMOVE_RECIPE,
    EXCHANGE_RECIPES,
    DispatchSetRecipes,
    DispatchAddRecipe,
    DispatchUpdateRecipe,
    DispatchRemoveRecipe
} from './types';

import { create, update, remove, getAll } from "../../../services/recipe/recipes";


export const initializeRecipes = () => {
  return async (dispatch: DispatchSetRecipes) => {
    const recipes = await getAll();
    dispatch({
      type: SET_RECIPES,
      payload: recipes,
    });
  }
};

export const addRecipe = (recipe: RecipeNoID) => {
  return async (dispatch: DispatchAddRecipe) => {
    const newRecipe = await create(recipe);
    dispatch({
      type: ADD_RECIPE,
      payload: newRecipe
    });
  }
};

export const updateRecipe = (recipe: Recipe) => {
  return async (dispatch: DispatchUpdateRecipe) => {
    const newRecipe = await update(recipe.id, recipe);
    dispatch({
      type: UPDATE_RECIPE,
      payload: newRecipe
    });
  }
};
  
export const removeRecipe = (id: string) => {
  return async (dispatch: DispatchRemoveRecipe) => {
    await remove(id);
    dispatch({
      type: REMOVE_RECIPE,
      payload: id
    });
  }
};

export const exchangeRecipes = (recipes: Recipe[]) => {
  const action = 
    {
      type: EXCHANGE_RECIPES,
      payload: recipes,
    }
        
    return action;  
};

