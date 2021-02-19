import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_SPORTGROUP, CLEAR_SELECTED_SPORTGROUP, ActionTypes } from './types';

import { emptyGroup } from '../../../utils/basic/group';


const initialState: Group = emptyGroup();

export const sportgroupReducer = (state = initialState, action: ActionTypes): Group => {
    switch (action.type) {
        case SET_SELECTED_SPORTGROUP:
            return (
                action.payload
            );
        case CLEAR_SELECTED_SPORTGROUP:
            return (
                initialState
            );
        default:
            return state
    }
};