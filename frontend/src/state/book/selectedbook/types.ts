import { Book } from '../../../types/book';

export const SET_SELECTED_BOOK = 'SET_SELECTED_BOOK';
export const CLEAR_SELECTED_BOOK = 'CLEAR_SELECTED_BOOK';

interface SetSelectedBookAction {
    type: typeof SET_SELECTED_BOOK;
    payload: Book;
}

interface ClearSelectedBookAction {
    type: typeof CLEAR_SELECTED_BOOK;
}

export type ActionTypes = SetSelectedBookAction | ClearSelectedBookAction;