import { Group } from '../../../../../backend/src/types/basic';
import { SET_DOCUMENTGROUPS, ADD_DOCUMENTGROUP, UPDATE_DOCUMENTGROUP, REMOVE_DOCUMENTGROUP, EXCHANGE_DOCUMENTGROUPS, ActionTypes } from './types';

const initialState: Group[] = [];

export const documentgroupsReducer = (state = initialState, action: ActionTypes): Group[] => {
    switch (action.type) {
        case SET_DOCUMENTGROUPS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, accounttype) => ({ ...memo, [accounttype.id]: accounttype }),
                    {}
                ),
            }
        case ADD_DOCUMENTGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_DOCUMENTGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_DOCUMENTGROUP: 
            return {
                ...(Object.values(state)).filter((accounttype) => (accounttype.id !== action.payload))
            }
        case EXCHANGE_DOCUMENTGROUPS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

