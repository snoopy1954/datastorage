import { Book } from '../../../../../backend/src/types/book';
import { ADD_CHANGED_BOOK, CLEAR_CHANGED_BOOK, ActionTypes } from './types';

const initialState: Book[] = [];

export const changedbooklistReducer = (state = initialState, action: ActionTypes): Book[] => {
    switch (action.type) {
        case ADD_CHANGED_BOOK:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case CLEAR_CHANGED_BOOK:
            return {
                ...initialState
            }
        default:
            return state
    }
}

