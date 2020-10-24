import { Book } from '../../../types/book';
import { ADD_CHANGED_BOOK, CLEAR_CHANGED_BOOK, ActionTypes } from './types';


export const addChangedBook = (book: Book) => {
  const action: ActionTypes = 
    {
      type: ADD_CHANGED_BOOK,
      payload: book
    }
        
    return action;  
}

export const clearChangedBook = () => {
  const action: ActionTypes = 
    {
      type: CLEAR_CHANGED_BOOK
    }
        
    return action;  
}

