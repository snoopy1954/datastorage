import { Group } from '../../../../../backend/src/types/basic';
import { SET_RECIPEGROUPS, ADD_RECIPEGROUP, UPDATE_RECIPEGROUP, REMOVE_RECIPEGROUP, EXCHANGE_RECIPEGROUPS, ActionTypes } from './types';

const initialState: Group[] = [];

export const recipegroupsReducer = (state = initialState, action: ActionTypes): Group[] => {
    switch (action.type) {
        case SET_RECIPEGROUPS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, accounttype) => ({ ...memo, [accounttype.id]: accounttype }),
                    {}
                ),
            }
        case ADD_RECIPEGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_RECIPEGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_RECIPEGROUP: 
            return {
                ...(Object.values(state)).filter((accounttype) => (accounttype.id !== action.payload))
            }
        case EXCHANGE_RECIPEGROUPS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

