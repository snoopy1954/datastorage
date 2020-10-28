import { Year } from '../../../../../backend/src/types/pressure';

export const SET_YEAR_LIST = 'SET_YEAR_LIST';

interface SetYearListAction {
    type: typeof SET_YEAR_LIST;
    payload: Year[];
}

export type YearListActionTypes = SetYearListAction;
