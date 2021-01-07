import { Filter } from '../../../types/movie';
import { SET_MOVIEFILTER, CLEAR_MOVIEFILTER, ActionTypes } from './types';

const initialState: Filter = {
    group: '',
    subgroup: ''
};

export const moviefilterReducer = (state = initialState, action: ActionTypes): Filter => {
    switch (action.type) {
        case SET_MOVIEFILTER: 
            return {
                ...action.payload
            }
        case CLEAR_MOVIEFILTER:
            return {
                ...initialState
            }
        default: {
            return state
        }
    }
}