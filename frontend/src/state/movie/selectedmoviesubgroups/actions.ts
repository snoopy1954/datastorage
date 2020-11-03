import { SET_MOVIESUBGROUPS, CLEAR_MOVIESUBGROUPS, ActionTypes } from './types';

export const setSelectedMoviesubgroups = (subgroups: string[]) => {
    const action: ActionTypes = {
        type: SET_MOVIESUBGROUPS,
        payload: subgroups
    };
    
    return action;  
}

export const clearSelectedMoviesubgroups = () => {
    const action: ActionTypes = {
        type: CLEAR_MOVIESUBGROUPS
    };
    
    return action;  
}

