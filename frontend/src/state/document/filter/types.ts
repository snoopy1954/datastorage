import { Filter } from '../../../types/document';

export const SET_DOCUMENTFILTER = 'SET_DOCUMENTFILTER';
export const CLEAR_DOCUMENTFILTER = 'CLEAR_DOCUMENTFILTER';

interface SetDocumentfilterAction {
    type: typeof SET_DOCUMENTFILTER;
    payload: Filter;
}

interface ClearDocumentfilterAction {
    type: typeof CLEAR_DOCUMENTFILTER;
}

export type ActionTypes = SetDocumentfilterAction | ClearDocumentfilterAction;