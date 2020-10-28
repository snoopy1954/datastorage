import { Year } from '../../../../../backend/src/types/pressure';
import { SET_YEAR_LIST, YearListActionTypes } from './types';

export const setYearList = (years: Year[]) => {
    const action: YearListActionTypes = {
        type: SET_YEAR_LIST,
        payload: years
    };
    
    return action;  
}

