import { Filter } from '../../../../../backend/src/types/movie';

export const SET_MOVIEFILTER = 'SET_MOVIEFILTER';
export const CLEAR_MOVIEFILTER = 'CLEAR_MOVIEFILTER';

interface SetMoviefilterAction {
    type: typeof SET_MOVIEFILTER;
    payload: Filter;
}

interface ClearMoviefilterAction {
    type: typeof CLEAR_MOVIEFILTER;
}

export type ActionTypes = SetMoviefilterAction | ClearMoviefilterAction;