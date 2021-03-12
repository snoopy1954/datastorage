import { Book } from '../../../../../backend/src/types/book';
import { SET_BOOK_LIST, ADD_BOOK, UPDATE_BOOK, REMOVE_BOOK, EXCHANGE_BOOKS, ActionTypes } from './types';

const initialState: Book[] = [];

export const booksReducer = (state = initialState, action: ActionTypes): Book[] => {
    switch (action.type) {
        case SET_BOOK_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, book) => ({ ...memo, [book.id]: book }),
                    {}
                ),
            }
        case ADD_BOOK:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_BOOK:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_BOOK: 
            return {
                ...(Object.values(state)).filter((book) => (book.id !== action.payload))
            }
        case EXCHANGE_BOOKS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

