import { Activity } from '../../../../../backend/src/types/sport';
import { SET_SELECTED_ACTIVITY, CLEAR_SELECTED_ACTIVITY, ActionTypes } from './types';

export const setSelectedActivity = (activity: Activity) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ACTIVITY,
        payload: activity
    };
    
    return action;  
};

export const clearSelectedActivity = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ACTIVITY
    };
    
    return action;  
};
