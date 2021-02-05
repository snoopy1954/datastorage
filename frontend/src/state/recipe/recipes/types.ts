import { Recipe } from '../../../../../backend/src/types/recipe';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE  = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const REMOVE_RECIPE = 'REMOVE_RECIPE';
export const EXCHANGE_RECIPES = 'EXCHANGE_RECIPES';

interface SetRecipesAction {
    type: typeof SET_RECIPES;
    payload: Recipe[];
}

interface AddRecipeAction {
    type: typeof ADD_RECIPE;
    payload: Recipe;
}

interface UpdateRecipeAction {
    type: typeof UPDATE_RECIPE;
    payload: Recipe;
}

interface RemoveRecipeAction {
    type: typeof REMOVE_RECIPE;
    payload: string;
}

interface ExchangeRecipesAction {
    type: typeof EXCHANGE_RECIPES;
    payload: Recipe[];
}

export type DispatchSetRecipes = (arg: SetRecipesAction) => (SetRecipesAction);
export type DispatchAddRecipe = (arg: AddRecipeAction) => (AddRecipeAction);
export type DispatchUpdateRecipe = (arg: UpdateRecipeAction) => (UpdateRecipeAction);
export type DispatchRemoveRecipe = (arg: RemoveRecipeAction) => (RemoveRecipeAction);
    
export type ActionTypes = SetRecipesAction | AddRecipeAction | UpdateRecipeAction | RemoveRecipeAction | ExchangeRecipesAction;
    