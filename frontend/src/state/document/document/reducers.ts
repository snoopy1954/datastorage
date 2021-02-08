import { Document } from '../../../../../backend/src/types/document';
import { SET_SELECTED_DOCUMENT, CLEAR_SELECTED_DOCUMENT, ActionTypes } from './types';

import { emptyDocument } from '../../../utils/document/document';


const initialState: Document = emptyDocument();

export const documentReducer = (state = initialState, action: ActionTypes): Document => {
    switch (action.type) {
        case SET_SELECTED_DOCUMENT:
            return (
                action.payload
            );
        case CLEAR_SELECTED_DOCUMENT:
            return (
                initialState
            );
        default:
            return state
    }
};