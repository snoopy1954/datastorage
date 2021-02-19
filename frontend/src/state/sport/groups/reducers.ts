import { Group } from '../../../../../backend/src/types/basic';
import { SET_SPORTGROUPS, ADD_SPORTGROUP, UPDATE_SPORTGROUP, REMOVE_SPORTGROUP, ActionTypes } from './types';

const initialState: Group[] = [];

export const sportgroupsReducer = (state = initialState, action: ActionTypes): Group[] => {
    switch (action.type) {
        case SET_SPORTGROUPS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, sportgroup) => ({ ...memo, [sportgroup.id]: sportgroup }),
                    {}
                ),
            }
        case ADD_SPORTGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_SPORTGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_SPORTGROUP: 
            return {
                ...(Object.values(state)).filter((sportgroup) => (sportgroup.id !== action.payload))
            }
        default:
            return state
    }
}

