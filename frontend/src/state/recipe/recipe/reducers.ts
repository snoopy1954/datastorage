import { Recipe } from '../../../../../backend/src/types/recipe';
import { SET_SELECTED_RECIPE, CLEAR_SELECTED_RECIPE, ActionTypes } from './types';

import { emptyRecipe } from '../../../utils/recipe/recipe';


const initialState: Recipe = emptyRecipe();

export const recipeReducer = (state = initialState, action: ActionTypes): Recipe => {
    switch (action.type) {
        case SET_SELECTED_RECIPE:
            return (
                action.payload
            );
        case CLEAR_SELECTED_RECIPE:
            return (
                initialState
            );
        default:
            return state
    }
};