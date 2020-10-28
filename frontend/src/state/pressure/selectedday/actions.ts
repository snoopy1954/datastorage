import { Day } from '../../../../../backend/src/types/pressure';
import { SET_SELECTED_DAY, CLEAR_SELECTED_DAY, SelectedDayActionTypes } from './types';

export const setSelectedDay = (day: Day) => {
    const action: SelectedDayActionTypes = {
        type: SET_SELECTED_DAY,
        payload: day
    };
    
    return action;  
}

export const clearSelectedDay = () => {
    const action: SelectedDayActionTypes = {
        type: CLEAR_SELECTED_DAY
    };
    
    return action;  
}

