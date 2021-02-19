import { Activity } from '../../../../../backend/src/types/sport';
import { SET_SELECTED_ACTIVITY, CLEAR_SELECTED_ACTIVITY, ActionTypes } from './types';

import { emptyActivity } from '../../../utils/sport/activity';


const initialState: Activity = emptyActivity();

export const activityReducer = (state = initialState, action: ActionTypes): Activity => {
    switch (action.type) {
        case SET_SELECTED_ACTIVITY:
            return (
                action.payload
            );
        case CLEAR_SELECTED_ACTIVITY:
            return (
                initialState
            );
        default:
            return state
    }
};