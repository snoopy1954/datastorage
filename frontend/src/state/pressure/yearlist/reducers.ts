import { Year } from '../../../../../backend/src/types/pressure';
import { SET_YEAR_LIST, YearListActionTypes } from './types';

const initialStateYearList: Year[] = [];

export const yearlistReducer = (state = initialStateYearList, action: YearListActionTypes): Year[] => {
    switch (action.type) {
        case SET_YEAR_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, year) => ({ ...memo, [year.name]: year }),
                    {}
                ),
            }
        default:
            return state
    }
}