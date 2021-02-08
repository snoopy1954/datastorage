import { Document } from '../../../../../backend/src/types/document';

export const SET_SELECTED_DOCUMENT = 'SET_SELECTED_DOCUMENT';
export const CLEAR_SELECTED_DOCUMENT = 'CLEAR_SELECTED_DOCUMENT';

interface SetSelectedDocumentAction {
    type: typeof SET_SELECTED_DOCUMENT;
    payload: Document;
}

interface ClearSelectedDocumentAction {
    type: typeof CLEAR_SELECTED_DOCUMENT;
}

export type ActionTypes = SetSelectedDocumentAction | ClearSelectedDocumentAction;