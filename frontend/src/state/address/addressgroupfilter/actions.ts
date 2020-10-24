import { SET_ADDRESSGROUP_FILTER, CLEAR_ADDRESSGROUP_FILTER, ActionTypes } from './types';

export const setAddressgroupFilter = (addressgroup: string) => {
    const action: ActionTypes = {
        type: SET_ADDRESSGROUP_FILTER,
        payload: addressgroup
    };
    
    return action;  
}

export const clearAddressgroupFilter = () => {
    const action: ActionTypes = {
        type: CLEAR_ADDRESSGROUP_FILTER
    };
    
    return action;  
}
