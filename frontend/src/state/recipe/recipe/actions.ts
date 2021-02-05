import { Recipe } from '../../../../../backend/src/types/recipe';
import { SET_SELECTED_RECIPE, CLEAR_SELECTED_RECIPE, ActionTypes } from './types';

export const setSelectedRecipe = (recipe: Recipe) => {
    const action: ActionTypes = {
        type: SET_SELECTED_RECIPE,
        payload: recipe
    };
    
    return action;  
};

export const clearSelectedRecipe = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_RECIPE
    };
    
    return action;  
};
