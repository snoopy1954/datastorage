import { Bookgroup } from '../../../../../backend/src/types/book';
import { SET_BOOKGROUP_LIST, ADD_BOOKGROUP, UPDATE_BOOKGROUP, REMOVE_BOOKGROUP, ActionTypes } from './types';

const initialState: Bookgroup[] = [];

export const bookgrouplistReducer = (state = initialState, action: ActionTypes): Bookgroup[] => {
    switch (action.type) {
        case SET_BOOKGROUP_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, bookgroup) => ({ ...memo, [bookgroup.id]: bookgroup }),
                    {}
                ),
            }
        case ADD_BOOKGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_BOOKGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_BOOKGROUP: 
            return {
                ...(Object.values(state)).filter((bookgroup) => (bookgroup.id !== action.payload))
            }
        default:
            return state
    }
}

