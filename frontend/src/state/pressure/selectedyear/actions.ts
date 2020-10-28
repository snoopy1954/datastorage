import { Year } from '../../../../../backend/src/types/pressure';
import { SET_SELECTED_YEAR, CLEAR_SELECTED_YEAR, SelectedYearActionTypes } from './types';

export const setSelectedYear = (year: Year) => {
    const action: SelectedYearActionTypes = {
        type: SET_SELECTED_YEAR,
        payload: year
    };
    
    return action;  
}

export const clearSelectedYear = () => {
    const action: SelectedYearActionTypes = {
        type: CLEAR_SELECTED_YEAR
    };
    
    return action;  
}

