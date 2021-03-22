import { Account } from '../../../../../backend/src/types/axa';
import { SET_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, REMOVE_ACCOUNT, REFRESH_ACCOUNT, ActionTypes } from './types';

const initialState: Account[] = [];

export const accountsReducer = (state = initialState, action: ActionTypes): Account[] => {
    switch (action.type) {
        case SET_ACCOUNTS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, account) => ({ ...memo, [account.id]: account }),
                    {}
                ),
            }
        case ADD_ACCOUNT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ACCOUNT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REFRESH_ACCOUNT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ACCOUNT: 
            return {
                ...(Object.values(state)).filter((account) => (account.id !== action.payload))
            }
        default:
            return state
    }
}

