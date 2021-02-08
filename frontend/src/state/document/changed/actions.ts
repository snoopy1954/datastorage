import { Document } from '../../../../../backend/src/types/document';
import { ADD_CHANGED_DOCUMENT, CLEAR_CHANGED_DOCUMENT, ActionTypes } from './types';


export const addChangedDocument = (document: Document) => {
  const action: ActionTypes = 
    {
      type: ADD_CHANGED_DOCUMENT,
      payload: document
    }
        
    return action;  
}

export const clearChangedDocument = () => {
  const action: ActionTypes = 
    {
      type: CLEAR_CHANGED_DOCUMENT
    }
        
    return action;  
}

