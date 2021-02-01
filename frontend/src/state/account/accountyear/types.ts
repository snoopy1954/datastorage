import { Accountyear } from '../../../../../backend/src/types/account';

export const SET_SELECTED_ACCOUNTYEAR = 'SET_SELECTED_ACCOUNTYEAR';
export const CLEAR_SELECTED_ACCOUNTYEAR = 'CLEAR_SELECTED_ACCOUNTYEAR';

interface SetSelectedAccountyearAction {
    type: typeof SET_SELECTED_ACCOUNTYEAR;
    payload: Accountyear;
}

interface ClearSelectedAccountyearAction {
    type: typeof CLEAR_SELECTED_ACCOUNTYEAR;
}

export type ActionTypes = SetSelectedAccountyearAction | ClearSelectedAccountyearAction;