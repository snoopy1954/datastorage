import { Group } from '../../../../../backend/src/types/basic';
import { SET_MUSICGROUPS, ADD_MUSICGROUP, UPDATE_MUSICGROUP, REMOVE_MUSICGROUP, ActionTypes } from './types';

const initialState: Group[] = [];

export const musicgroupsReducer = (state = initialState, action: ActionTypes): Group[] => {
    switch (action.type) {
        case SET_MUSICGROUPS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, musicgroup) => ({ ...memo, [musicgroup.id]: musicgroup }),
                    {}
                ),
            }
        case ADD_MUSICGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_MUSICGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_MUSICGROUP: 
            return {
                ...(Object.values(state)).filter((musicgroup) => (musicgroup.id !== action.payload))
            }
        default:
            return state
    }
}

