import { Recipe } from '../../../../../backend/src/types/recipe';

export const ADD_CHANGED_RECIPE  = 'ADD_CHANGED_RECIPE';
export const CLEAR_CHANGED_RECIPE  = 'CLEAR_CHANGED_RECIPE';

interface AddChangedRecipeAction {
    type: typeof ADD_CHANGED_RECIPE;
    payload: Recipe;
}

interface ClearChangedRecipeAction {
    type: typeof CLEAR_CHANGED_RECIPE;
}
    
export type ActionTypes = AddChangedRecipeAction | ClearChangedRecipeAction;
    