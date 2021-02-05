import { Recipe } from '../../../../../backend/src/types/recipe';
import { SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, REMOVE_RECIPE, EXCHANGE_RECIPES, ActionTypes } from './types';

const initialState: Recipe[] = [];

export const recipesReducer = (state = initialState, action: ActionTypes): Recipe[] => {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, recipe) => ({ ...memo, [recipe.id]: recipe }),
                    {}
                ),
            }
        case ADD_RECIPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_RECIPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_RECIPE: 
            return {
                ...(Object.values(state)).filter((recipe) => (recipe.id !== action.payload))
            }
        case EXCHANGE_RECIPES:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

