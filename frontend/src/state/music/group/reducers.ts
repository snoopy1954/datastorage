import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_MUSICGROUP, CLEAR_SELECTED_MUSICGROUP, ActionTypes } from './types';

import { emptyGroup } from '../../../utils/basic/group';


const initialState: Group = emptyGroup();

export const musicgroupReducer = (state = initialState, action: ActionTypes): Group => {
    switch (action.type) {
        case SET_SELECTED_MUSICGROUP:
            return (
                action.payload
            );
        case CLEAR_SELECTED_MUSICGROUP:
            return (
                initialState
            );
        default:
            return state
    }
};