import { Document } from '../../../../../backend/src/types/document';

export const ADD_CHANGED_DOCUMENT  = 'ADD_CHANGED_DOCUMENT';
export const CLEAR_CHANGED_DOCUMENT  = 'CLEAR_CHANGED_DOCUMENT';

interface AddChangedDocumentAction {
    type: typeof ADD_CHANGED_DOCUMENT;
    payload: Document;
}

interface ClearChangedDocumentAction {
    type: typeof CLEAR_CHANGED_DOCUMENT;
}
    
export type ActionTypes = AddChangedDocumentAction | ClearChangedDocumentAction;
    