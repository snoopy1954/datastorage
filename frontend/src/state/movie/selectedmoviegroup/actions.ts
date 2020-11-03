import { Moviegroup } from '../../../../../backend/src/types/movie';
import { SET_SELECTED_MOVIEGROUP, CLEAR_SELECTED_MOVIEGROUP, ActionTypes } from './types';

export const setSelectedMoviegroup = (moviegroup: Moviegroup) => {
    const action: ActionTypes = {
        type: SET_SELECTED_MOVIEGROUP,
        payload: moviegroup
    };
    
    return action;  
}

export const clearSelectedMoviegroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_MOVIEGROUP
    };
    
    return action;  
}

