import { Document } from '../../../../../backend/src/types/document';
import { SET_DOCUMENTS, ADD_DOCUMENT, UPDATE_DOCUMENT, REMOVE_DOCUMENT, EXCHANGE_DOCUMENTS, ActionTypes } from './types';

const initialState: Document[] = [];

export const documentsReducer = (state = initialState, action: ActionTypes): Document[] => {
    switch (action.type) {
        case SET_DOCUMENTS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, document) => ({ ...memo, [document.id]: document }),
                    {}
                ),
            }
        case ADD_DOCUMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_DOCUMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_DOCUMENT: 
            return {
                ...(Object.values(state)).filter((document) => (document.id !== action.payload))
            }
        case EXCHANGE_DOCUMENTS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

