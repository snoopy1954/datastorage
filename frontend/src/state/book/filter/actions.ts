import { Filter } from '../../../types/book';
import { SET_FILTER, CLEAR_FILTER, ActionTypes } from './types';

export const setFilter = (page: Filter) => {
    const action: ActionTypes = {
        type: SET_FILTER,
        payload: page
    };
    
    return action;  
}

export const clearFilter = () => {
    const action: ActionTypes = {
        type: CLEAR_FILTER
    };
    
    return action;  
}
