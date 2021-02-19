import { Filter } from '../../../types/document';

import { SET_DOCUMENTFILTER, CLEAR_DOCUMENTFILTER, ActionTypes } from './types';

export const setDocumentfilter = (accountfilter: Filter) => {
    const action: ActionTypes = {
        type: SET_DOCUMENTFILTER,
        payload: accountfilter
    };
    
    return action;  
}

export const clearDocumentfilter = () => {
    const action: ActionTypes = {
        type: CLEAR_DOCUMENTFILTER
    };
    
    return action;  
}
