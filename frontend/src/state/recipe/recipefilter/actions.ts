import { Filter } from '../../../types/recipe';

import { SET_RECIPEFILTER, CLEAR_RECIPEFILTER, ActionTypes } from './types';

export const setRecipefilter = (accountfilter: Filter) => {
    const action: ActionTypes = {
        type: SET_RECIPEFILTER,
        payload: accountfilter
    };
    
    return action;  
}

export const clearRecipefilter = () => {
    const action: ActionTypes = {
        type: CLEAR_RECIPEFILTER
    };
    
    return action;  
}
