import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_RECIPEGROUP, CLEAR_SELECTED_RECIPEGROUP, ActionTypes } from './types';

import { emptyGroup } from '../../../utils/basic/group';


const initialState: Group = emptyGroup();

export const recipegroupReducer = (state = initialState, action: ActionTypes): Group => {
    switch (action.type) {
        case SET_SELECTED_RECIPEGROUP:
            return (
                action.payload
            );
        case CLEAR_SELECTED_RECIPEGROUP:
            return (
                initialState
            );
        default:
            return state
    }
};