import { Accountfilter } from '../../../types/account';

export const SET_ACCOUNTFILTER = 'SET_ACCOUNTFILTER';
export const CLEAR_ACCOUNTFILTER = 'CLEAR_ACCOUNTFILTER';

interface SetAccountfilterAction {
    type: typeof SET_ACCOUNTFILTER;
    payload: Accountfilter;
}

interface ClearAccountfilterAction {
    type: typeof CLEAR_ACCOUNTFILTER;
}

export type ActionTypes = SetAccountfilterAction | ClearAccountfilterAction;