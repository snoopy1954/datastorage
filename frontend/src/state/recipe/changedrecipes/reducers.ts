import { Recipe } from '../../../../../backend/src/types/recipe';
import { ADD_CHANGED_RECIPE, CLEAR_CHANGED_RECIPE, ActionTypes } from './types';

const initialState: Recipe[] = [];

export const changedrecipesReducer = (state = initialState, action: ActionTypes): Recipe[] => {
    switch (action.type) {
        case ADD_CHANGED_RECIPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case CLEAR_CHANGED_RECIPE:
            return {
                ...initialState
            }
        default:
            return state
    }
}

