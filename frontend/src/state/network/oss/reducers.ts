import { Os } from '../../../../../backend/src/types/network';
import { SET_OSS, ADD_OS, UPDATE_OS, REMOVE_OS, ActionTypes } from './types';

const initialState: Os[] = [];

export const ossReducer = (state = initialState, action: ActionTypes): Os[] => {
    switch (action.type) {
        case SET_OSS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, os) => ({ ...memo, [os.id]: os }),
                    {}
                ),
            }
        case ADD_OS:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_OS:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_OS: 
            return {
                ...(Object.values(state)).filter((os) => (os.id !== action.payload))
            }
        default:
            return state
    }
}

