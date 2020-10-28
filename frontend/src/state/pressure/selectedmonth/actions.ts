import { Month } from '../../../../../backend/src/types/pressure';
import { CLEAR_SELECTED_MONTH, SET_SELECTED_MONTH, SelectedMonthActionTypes } from './types';

export const setSelectedMonth = (year: Month) => {
    const action: SelectedMonthActionTypes = {
        type: SET_SELECTED_MONTH,
        payload: year
    };
    
    return action;  
}

export const clearSelectedMonth = () => {
    const action: SelectedMonthActionTypes = {
        type: CLEAR_SELECTED_MONTH
    };
    
    return action;  
}

