import { Transaction } from '../../../../../backend/src/types/account';
import { SET_TRANSACTIONS, ADD_TRANSACTION, UPDATE_TRANSACTION, REMOVE_TRANSACTION, ActionTypes } from './types';

const initialState: Transaction[] = [];

export const transactionsReducer = (state = initialState, action: ActionTypes): Transaction[] => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return {
                ...state,
                ...action.payload.reduce((memo, year) => ({ ...memo, [year.id]: year }), {}),
            }
        case ADD_TRANSACTION:
            return {
                [action.payload.id]: action.payload,
                ...state,
            }
        case UPDATE_TRANSACTION:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_TRANSACTION: 
            return {
                ...(Object.values(state)).filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}

