import { Ownership } from '../../../../../backend/src/types/book';

export const SET_OWNERSHIP_LIST = 'SET_OWNERSHIP_LIST';
export const ADD_OWNERSHIP  = 'ADD_OWNERSHIP';
export const UPDATE_OWNERSHIP = 'UPDATE_OWNERSHIP';
export const REMOVE_OWNERSHIP = 'REMOVE_OWNERSHIP';

interface SetOwnershipListAction {
    type: typeof SET_OWNERSHIP_LIST;
    payload: Ownership[];
}

interface AddOwnershipAction {
    type: typeof ADD_OWNERSHIP;
    payload: Ownership;
}

interface UpdateOwnershipAction {
    type: typeof UPDATE_OWNERSHIP;
    payload: Ownership;
}

interface RemoveOwnershipAction {
    type: typeof REMOVE_OWNERSHIP;
    payload: string;
}

export type DispatchSetOwnershipList = (arg: SetOwnershipListAction) => (SetOwnershipListAction);
export type DispatchAddOwnership = (arg: AddOwnershipAction) => (AddOwnershipAction);
export type DispatchUpdateOwnership = (arg: UpdateOwnershipAction) => (UpdateOwnershipAction);
export type DispatchRemoveOwnership = (arg: RemoveOwnershipAction) => (RemoveOwnershipAction);
    
export type ActionTypes = SetOwnershipListAction | AddOwnershipAction | UpdateOwnershipAction | RemoveOwnershipAction;
    