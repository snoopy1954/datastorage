import { Year } from '../../../types/pressure';
import { SET_SELECTED_YEAR, CLEAR_SELECTED_YEAR, SelectedYearActionTypes } from './types';

const initialState: Year = {
    name: '',
    isLastYear: false,
    lastMonth: 0
};

export const selectedyearReducer = (state = initialState, action: SelectedYearActionTypes): Year => {
    switch (action.type) {
        case SET_SELECTED_YEAR:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_YEAR:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};