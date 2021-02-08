import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_DOCUMENTGROUP, CLEAR_SELECTED_DOCUMENTGROUP, ActionTypes } from './types';

import { emptyGroup } from '../../../utils/basic/group';


const initialState: Group = emptyGroup();

export const documentgroupReducer = (state = initialState, action: ActionTypes): Group => {
    switch (action.type) {
        case SET_SELECTED_DOCUMENTGROUP:
            return (
                action.payload
            );
        case CLEAR_SELECTED_DOCUMENTGROUP:
            return (
                initialState
            );
        default:
            return state
    }
};