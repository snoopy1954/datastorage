import { Addressgroup } from '../../../../../backend/src/types/address';

export const SET_SELECTED_ADDRESSGROUP = 'SET_SELECTED_ADDRESSGROUP';
export const CLEAR_SELECTED_ADDRESSGROUP = 'CLEAR_SELECTED_ADDRESSGROUP';

interface SetSelectedAddressgroupAction {
    type: typeof SET_SELECTED_ADDRESSGROUP;
    payload: Addressgroup;
}

interface ClearSelectedAddressgroupAction {
    type: typeof CLEAR_SELECTED_ADDRESSGROUP;
}

export type ActionTypes = SetSelectedAddressgroupAction | ClearSelectedAddressgroupAction;