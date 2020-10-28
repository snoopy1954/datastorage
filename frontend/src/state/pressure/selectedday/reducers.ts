import { Day } from '../../../../../backend/src/types/pressure';
import { SET_SELECTED_DAY, CLEAR_SELECTED_DAY, SelectedDayActionTypes } from './types';

const initialState: Day = {
    date: "",
    weight: "",
    early: {
        time: "",
        systolic: "",
        diastolic: "",
        pulse: ""
    },
    late: {
        time: "",
        systolic: "",
        diastolic: "",
        pulse: ""
    }
};

export const selecteddayReducer = (state = initialState, action: SelectedDayActionTypes): Day => {
    switch (action.type) {
        case SET_SELECTED_DAY:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_DAY:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};