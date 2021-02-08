import { Document } from '../../../../../backend/src/types/document';
import { SET_SELECTED_DOCUMENT, CLEAR_SELECTED_DOCUMENT, ActionTypes } from './types';

export const setSelectedDocument = (document: Document) => {
    const action: ActionTypes = {
        type: SET_SELECTED_DOCUMENT,
        payload: document
    };
    
    return action;  
};

export const clearSelectedDocument = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_DOCUMENT
    };
    
    return action;  
};
