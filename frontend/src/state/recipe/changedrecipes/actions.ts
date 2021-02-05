import { Recipe } from '../../../../../backend/src/types/recipe';
import { ADD_CHANGED_RECIPE, CLEAR_CHANGED_RECIPE, ActionTypes } from './types';


export const addChangedRecipe = (recipe: Recipe) => {
  const action: ActionTypes = 
    {
      type: ADD_CHANGED_RECIPE,
      payload: recipe
    }
        
    return action;  
}

export const clearChangedRecipe = () => {
  const action: ActionTypes = 
    {
      type: CLEAR_CHANGED_RECIPE
    }
        
    return action;  
}

