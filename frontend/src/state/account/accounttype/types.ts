import { Accounttype } from '../../../../../backend/src/types/account';

export const SET_SELECTED_ACCOUNTTYPE = 'SET_SELECTED_ACCOUNTTYPE';
export const CLEAR_SELECTED_ACCOUNTTYPE = 'CLEAR_SELECTED_ACCOUNTTYPE';

interface SetSelectedAccounttypeAction {
    type: typeof SET_SELECTED_ACCOUNTTYPE;
    payload: Accounttype;
}

interface ClearSelectedAccounttypeAction {
    type: typeof CLEAR_SELECTED_ACCOUNTTYPE;
}

export type ActionTypes = SetSelectedAccounttypeAction | ClearSelectedAccounttypeAction;