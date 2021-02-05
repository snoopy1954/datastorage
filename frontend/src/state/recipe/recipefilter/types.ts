import { Filter } from '../../../types/recipe';

export const SET_RECIPEFILTER = 'SET_RECIPEFILTER';
export const CLEAR_RECIPEFILTER = 'CLEAR_RECIPEFILTER';

interface SetRecipefilterAction {
    type: typeof SET_RECIPEFILTER;
    payload: Filter;
}

interface ClearRecipefilterAction {
    type: typeof CLEAR_RECIPEFILTER;
}

export type ActionTypes = SetRecipefilterAction | ClearRecipefilterAction;