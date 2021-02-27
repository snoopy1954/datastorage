import { Filter } from '../../../types/music';

export const SET_SELECTED_ARTISTFILTER = 'SET_SELECTED_ARTISTFILTER';
export const CLEAR_SELECTED_ARTISTFILTER = 'CLEAR_SELECTED_ARTISTFILTER';

interface SetSelectedFilterAction {
    type: typeof SET_SELECTED_ARTISTFILTER;
    payload: Filter;
}

interface ClearSelectedFilterAction {
    type: typeof CLEAR_SELECTED_ARTISTFILTER;
}

export type ActionTypes = SetSelectedFilterAction | ClearSelectedFilterAction;