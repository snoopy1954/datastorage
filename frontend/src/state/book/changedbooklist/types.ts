import { Book } from '../../../types/book';

export const ADD_CHANGED_BOOK  = 'ADD_CHANGED_BOOK';
export const CLEAR_CHANGED_BOOK  = 'CLEAR_CHANGED_BOOK';

interface AddChangedBookAction {
    type: typeof ADD_CHANGED_BOOK;
    payload: Book;
}

interface ClearChangedBookAction {
    type: typeof CLEAR_CHANGED_BOOK;
}
    
export type ActionTypes = AddChangedBookAction | ClearChangedBookAction;
    