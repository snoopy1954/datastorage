import { Group } from '../../../../../backend/src/types/basic';

export const SET_RECIPEGROUPS = 'SET_RECIPEGROUPS';
export const ADD_RECIPEGROUP  = 'ADD_RECIPEGROUP';
export const UPDATE_RECIPEGROUP = 'UPDATE_RECIPEGROUP';
export const REMOVE_RECIPEGROUP = 'REMOVE_RECIPEGROUP';
export const EXCHANGE_RECIPEGROUPS = 'EXCHANGE_RECIPEGROUPS';

interface SetRecipegroupsAction {
    type: typeof SET_RECIPEGROUPS;
    payload: Group[];
}

interface AddRecipegroupAction {
    type: typeof ADD_RECIPEGROUP;
    payload: Group;
}

interface UpdateRecipegroupAction {
    type: typeof UPDATE_RECIPEGROUP;
    payload: Group;
}

interface RemoveRecipegroupAction {
    type: typeof REMOVE_RECIPEGROUP;
    payload: string;
}

interface ExchangeRecipegroupsAction {
    type: typeof EXCHANGE_RECIPEGROUPS;
    payload: Group[];
}

export type DispatchSetRecipegroups = (arg: SetRecipegroupsAction) => (SetRecipegroupsAction);
export type DispatchAddRecipegroup = (arg: AddRecipegroupAction) => (AddRecipegroupAction);
export type DispatchUpdateRecipegroup = (arg: UpdateRecipegroupAction) => (UpdateRecipegroupAction);
export type DispatchRemoveRecipegroup = (arg: RemoveRecipegroupAction) => (RemoveRecipegroupAction);
    
export type ActionTypes = SetRecipegroupsAction | AddRecipegroupAction | UpdateRecipegroupAction | RemoveRecipegroupAction | ExchangeRecipegroupsAction;
    