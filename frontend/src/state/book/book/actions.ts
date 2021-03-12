import { Book } from '../../../../../backend/src/types/book';
import { SET_SELECTED_BOOK, CLEAR_SELECTED_BOOK, ActionTypes } from './types';

export const setSelectedBook = (book: Book) => {
    const action: ActionTypes = {
        type: SET_SELECTED_BOOK,
        payload: book
    };
    
    return action;  
}

export const clearSelectedBook = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_BOOK
    };
    
    return action;  
}

