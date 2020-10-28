import { Book } from '../../../../../backend/src/types/book';

export const SET_BOOK_LIST = 'SET_BOOK_LIST';
export const ADD_BOOK  = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const EXCHANGE_BOOKS = 'EXCHANGE_BOOKS';

interface SetBookListAction {
    type: typeof SET_BOOK_LIST;
    payload: Book[];
}

interface AddBookAction {
    type: typeof ADD_BOOK;
    payload: Book;
}

interface UpdateBookAction {
    type: typeof UPDATE_BOOK;
    payload: Book;
}

interface RemoveBookAction {
    type: typeof REMOVE_BOOK;
    payload: string;
}

interface ExchangeBooksAction {
    type: typeof EXCHANGE_BOOKS;
    payload: Book[];
}

export type DispatchSetBookList = (arg: SetBookListAction) => (SetBookListAction);
export type DispatchAddBook = (arg: AddBookAction) => (AddBookAction);
export type DispatchUpdateBook = (arg: UpdateBookAction) => (UpdateBookAction);
export type DispatchRemoveBook = (arg: RemoveBookAction) => (RemoveBookAction);
    
export type ActionTypes = SetBookListAction | AddBookAction | UpdateBookAction | RemoveBookAction | ExchangeBooksAction;
    