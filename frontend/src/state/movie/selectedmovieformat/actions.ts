import { Format } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_MOVIEFORMAT, CLEAR_SELECTED_MOVIEFORMAT, ActionTypes } from './types';

export const setSelectedMovieformat = (movieformat: Format) => {
    const action: ActionTypes = {
        type: SET_SELECTED_MOVIEFORMAT,
        payload: movieformat
    };
    
    return action;  
}

export const clearSelectedMovieformat = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_MOVIEFORMAT
    };
    
    return action;  
}

