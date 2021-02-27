import { Filter } from '../../../types/music';

import { SET_SELECTED_ARTISTFILTER, CLEAR_SELECTED_ARTISTFILTER, ActionTypes } from './types';

export const setSelectedFilter = (filter: Filter) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ARTISTFILTER,
        payload: filter
    };
    
    return action;  
};

export const clearSelectedFilter = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ARTISTFILTER
    };
    
    return action;  
};
