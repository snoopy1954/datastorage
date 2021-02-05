import { Recipe } from '../../../../../backend/src/types/recipe';

export const SET_SELECTED_RECIPE = 'SET_SELECTED_RECIPE';
export const CLEAR_SELECTED_RECIPE = 'CLEAR_SELECTED_RECIPE';

interface SetSelectedRecipeAction {
    type: typeof SET_SELECTED_RECIPE;
    payload: Recipe;
}

interface ClearSelectedRecipeAction {
    type: typeof CLEAR_SELECTED_RECIPE;
}

export type ActionTypes = SetSelectedRecipeAction | ClearSelectedRecipeAction;