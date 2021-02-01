import { Accounttype } from '../../../../../backend/src/types/account';
import { SET_ACCOUNTTYPES, ADD_ACCOUNTTYPE, UPDATE_ACCOUNTTYPE, REMOVE_ACCOUNTTYPE, ActionTypes } from './types';

const initialState: Accounttype[] = [];

export const accounttypesReducer = (state = initialState, action: ActionTypes): Accounttype[] => {
    switch (action.type) {
        case SET_ACCOUNTTYPES:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, accounttype) => ({ ...memo, [accounttype.id]: accounttype }),
                    {}
                ),
            }
        case ADD_ACCOUNTTYPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ACCOUNTTYPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ACCOUNTTYPE: 
            return {
                ...(Object.values(state)).filter((accounttype) => (accounttype.id !== action.payload))
            }
        default:
            return state
    }
}

