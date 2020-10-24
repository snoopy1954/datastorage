import { Book, BookNoID } from '../../../types/book';
import { 
    SET_BOOK_LIST, 
    ADD_BOOK,
    UPDATE_BOOK,
    REMOVE_BOOK,
    EXCHANGE_BOOKS,
    DispatchSetBookList,
    DispatchAddBook,
    DispatchUpdateBook,
    DispatchRemoveBook
} from './types';

import { create, update, remove, getAll } from "../../../services/book/books";


export const initializeBooks = () => {
  return async (dispatch: DispatchSetBookList) => {
    const books = await getAll();
    dispatch({
      type: SET_BOOK_LIST,
      payload: books,
    });
  }
}

export const addBook = (book: BookNoID) => {
  return async (dispatch: DispatchAddBook) => {
    const newBook = await create(book);
    dispatch({
      type: ADD_BOOK,
      payload: newBook
    });
  }
};

export const updateBook = (book: Book) => {
  return async (dispatch: DispatchUpdateBook) => {
    const newBook = await update(book.id, book);
    dispatch({
      type: UPDATE_BOOK,
      payload: newBook
    });
  }
};
  
export const removeBook = (id: string) => {
  return async (dispatch: DispatchRemoveBook) => {
    await remove(id);
    dispatch({
      type: REMOVE_BOOK,
      payload: id
    });
  }
};

export const exchangeBooks = (books: Book[]) => {
  const action = 
    {
      type: EXCHANGE_BOOKS,
      payload: books,
    }
        
    return action;  
}

