import { Filter } from '../../../../../backend/src/types/movie';
import { SET_MOVIEFILTER, CLEAR_MOVIEFILTER, ActionTypes } from './types';

export const setMoviefilter = (moviefilter: Filter) => {
    const action: ActionTypes = {
        type: SET_MOVIEFILTER,
        payload: moviefilter
    };
    
    return action;  
}

export const clearMoviefilter = () => {
    const action: ActionTypes = {
        type: CLEAR_MOVIEFILTER
    };
    
    return action;  
}
