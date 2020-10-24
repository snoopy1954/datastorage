import { Filter } from '../../../types/book';
import { SET_FILTER, CLEAR_FILTER, ActionTypes } from './types';

const initialState: Filter = {
    group: '',
    subgroup: ''
};

export const filterReducer = (state = initialState, action: ActionTypes): Filter => {
    switch (action.type) {
        case SET_FILTER: 
            return {
                ...action.payload
            }
        case CLEAR_FILTER:
            return {
                ...initialState
            }
        default: {
            console.log('das passiert nie')
            return state
        }
    }
}