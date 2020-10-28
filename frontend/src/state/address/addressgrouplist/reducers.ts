import { Addressgroup } from '../../../../../backend/src/types/address';
import { SET_ADDRESSGROUP_LIST, ADD_ADDRESSGROUP, UPDATE_ADDRESSGROUP, REMOVE_ADDRESSGROUP, ActionTypes } from './types';

const initialState: Addressgroup[] = [];

export const addressgrouplistReducer = (state = initialState, action: ActionTypes): Addressgroup[] => {
    switch (action.type) {
        case SET_ADDRESSGROUP_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, addressgroup) => ({ ...memo, [addressgroup.id]: addressgroup }),
                    {}
                ),
            }
        case ADD_ADDRESSGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ADDRESSGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ADDRESSGROUP: 
            return {
                ...(Object.values(state)).filter((addressgroup) => (addressgroup.id !== action.payload))
            }
        default:
            return state
    }
}

