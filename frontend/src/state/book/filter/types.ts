import { Filter } from '../../../types/book';

export const SET_FILTER = 'SET_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

interface SetFilterAction {
    type: typeof SET_FILTER;
    payload: Filter;
}

interface ClearFilterAction {
    type: typeof CLEAR_FILTER;
}

export type ActionTypes = SetFilterAction | ClearFilterAction;