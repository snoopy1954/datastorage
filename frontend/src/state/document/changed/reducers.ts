import { Document } from '../../../../../backend/src/types/document';
import { ADD_CHANGED_DOCUMENT, CLEAR_CHANGED_DOCUMENT, ActionTypes } from './types';

const initialState: Document[] = [];

export const changeddocumentsReducer = (state = initialState, action: ActionTypes): Document[] => {
    switch (action.type) {
        case ADD_CHANGED_DOCUMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case CLEAR_CHANGED_DOCUMENT:
            return {
                ...initialState
            }
        default:
            return state
    }
}

