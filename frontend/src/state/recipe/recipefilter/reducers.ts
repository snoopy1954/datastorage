import { Filter } from '../../../types/recipe';
import { newFilter } from '../../../utils/recipe/filter';

import { SET_RECIPEFILTER, CLEAR_RECIPEFILTER, ActionTypes } from './types';

const initialState: Filter = newFilter();

export const recipefilterReducer = (state = initialState, action: ActionTypes): Filter => {
    switch (action.type) {
        case SET_RECIPEFILTER: 
            return {
                ...action.payload
            }
        case CLEAR_RECIPEFILTER:
            return {
                ...initialState
            }
        default: {
            return state
        }
    }
}