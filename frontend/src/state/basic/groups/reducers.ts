import { Group } from '../../../../../backend/src/types/basic';
import { SET_GROUPS, ADD_GROUP, UPDATE_GROUP, REMOVE_GROUP, EXCHANGE_GROUPS, ActionTypes } from './types';

const initialState: Group[] = [];

export const groupsReducer = (state = initialState, action: ActionTypes): Group[] => {
    switch (action.type) {
        case SET_GROUPS:
            return {
                ...initialState,
                ...action.payload.reduce(
                    (memo, group) => ({ ...memo, [group.id]: group }),
                    {}
                ),
            }
        case ADD_GROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_GROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_GROUP: 
            return {
                ...(Object.values(state)).filter((group) => (group.id !== action.payload))
            }
        case EXCHANGE_GROUPS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

