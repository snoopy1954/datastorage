import { Document } from '../../../../../backend/src/types/document';

export const SET_DOCUMENTS = 'SET_DOCUMENTS';
export const ADD_DOCUMENT  = 'ADD_DOCUMENT';
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT';
export const EXCHANGE_DOCUMENTS = 'EXCHANGE_DOCUMENTS';

interface SetDocumentsAction {
    type: typeof SET_DOCUMENTS;
    payload: Document[];
}

interface AddDocumentAction {
    type: typeof ADD_DOCUMENT;
    payload: Document;
}

interface UpdateDocumentAction {
    type: typeof UPDATE_DOCUMENT;
    payload: Document;
}

interface RemoveDocumentAction {
    type: typeof REMOVE_DOCUMENT;
    payload: string;
}

interface ExchangeDocumentsAction {
    type: typeof EXCHANGE_DOCUMENTS;
    payload: Document[];
}

export type DispatchSetDocuments = (arg: SetDocumentsAction) => (SetDocumentsAction);
export type DispatchAddDocument = (arg: AddDocumentAction) => (AddDocumentAction);
export type DispatchUpdateDocument = (arg: UpdateDocumentAction) => (UpdateDocumentAction);
export type DispatchRemoveDocument = (arg: RemoveDocumentAction) => (RemoveDocumentAction);
    
export type ActionTypes = SetDocumentsAction | AddDocumentAction | UpdateDocumentAction | RemoveDocumentAction | ExchangeDocumentsAction;
    