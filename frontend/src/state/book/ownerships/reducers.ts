import { Ownership } from '../../../../../backend/src/types/book';
import { SET_OWNERSHIP_LIST, ADD_OWNERSHIP, UPDATE_OWNERSHIP, REMOVE_OWNERSHIP, ActionTypes } from './types';

const initialState: Ownership[] = [];

export const ownershipsReducer = (state = initialState, action: ActionTypes): Ownership[] => {
    switch (action.type) {
        case SET_OWNERSHIP_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, ownership) => ({ ...memo, [ownership.id]: ownership }),
                    {}
                ),
            }
        case ADD_OWNERSHIP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_OWNERSHIP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_OWNERSHIP: 
            return {
                ...(Object.values(state)).filter((ownership) => (ownership.id !== action.payload))
            }
        default:
            return state
    }
}

