import { Month } from '../../../types/pressure';
import { SET_SELECTED_MONTH, CLEAR_SELECTED_MONTH, SelectedMonthActionTypes } from './types';

const initialState: Month = {
    
        id: "",
        key: "",
        year: "",
        month: "",
        monthname: "",
        weight: {
            total: "",
            start: "",
            end: ""
        },	   
        diastolic: {
            total: "",
            early: "",
            late: ""
        },	   
        systolic: {
            total: "",
            early: "",
            late: ""
        },	   	   
        pulse: {
            total: "",
            early: "",
            late: ""
        },	   	
        days: []
};

export const selectedmonthReducer = (state = initialState, action: SelectedMonthActionTypes): Month => {
    switch (action.type) {
        case SET_SELECTED_MONTH:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_MONTH:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};