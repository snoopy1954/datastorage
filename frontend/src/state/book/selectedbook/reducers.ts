import { Book } from '../../../types/book';
import { SET_SELECTED_BOOK, CLEAR_SELECTED_BOOK, ActionTypes } from './types';
import { newBook } from '../../../utils/book';

const book = newBook();
const initialState: Book = {
    id: '',
    ...book
};

export const selectedbookReducer = (state = initialState, action: ActionTypes): Book => {
    switch (action.type) {
        case SET_SELECTED_BOOK:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_BOOK:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};