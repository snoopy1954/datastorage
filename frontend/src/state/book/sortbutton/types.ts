export const SET_SORTBUTTON = 'SET_SORTBUTTON';
export const CLEAR_SORTBUTTON = 'CLEAR_SORTBUTTON';

interface SetSortButtonAction {
    type: typeof SET_SORTBUTTON;
}

interface ClearSortButtonAction {
    type: typeof CLEAR_SORTBUTTON;
}

export type ActionTypes = SetSortButtonAction | ClearSortButtonAction;