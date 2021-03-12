import { Book } from '../../../../../backend/src/types/book';
import { SET_SELECTED_BOOK, CLEAR_SELECTED_BOOK, ActionTypes } from './types';
import { emptyBook } from '../../../utils/book/book';

const initialState: Book = emptyBook();

export const bookReducer = (state = initialState, action: ActionTypes): Book => {
    switch (action.type) {
        case SET_SELECTED_BOOK:
            return (
                action.payload
            )
        case CLEAR_SELECTED_BOOK:
            return (
                initialState
            );
        default:
            return state
    }
};