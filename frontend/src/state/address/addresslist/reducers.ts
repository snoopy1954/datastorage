import { Address } from '../../../../../backend/src/types/addressTypes';
import { SET_ADDRESS_LIST, ADD_ADDRESS, UPDATE_ADDRESS, REMOVE_ADDRESS, ActionTypes } from './types';

const initialState: Address[] = [];

export const addresslistReducer = (state = initialState, action: ActionTypes): Address[] => {
    switch (action.type) {
        case SET_ADDRESS_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, address) => ({ ...memo, [address.id]: address }),
                    {}
                ),
            }
        case ADD_ADDRESS:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ADDRESS:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ADDRESS: 
            return {
                ...(Object.values(state)).filter((address) => (address.id !== action.payload))
            }
        default:
            return state
    }
}

