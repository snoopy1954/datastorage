import { Ownership } from '../../../types/book';

export const SET_SELECTED_OWNERSHIP = 'SET_SELECTED_OWNERSHIP';
export const CLEAR_SELECTED_OWNERSHIP = 'CLEAR_SELECTED_OWNERSHIP';

interface SetSelectedOwnershipAction {
    type: typeof SET_SELECTED_OWNERSHIP;
    payload: Ownership;
}

interface ClearSelectedOwnershipAction {
    type: typeof CLEAR_SELECTED_OWNERSHIP;
}

export type ActionTypes = SetSelectedOwnershipAction | ClearSelectedOwnershipAction;