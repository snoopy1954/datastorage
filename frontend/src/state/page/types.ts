export interface Page {
    mainpage: string;
    subpage: string;
}

export const SET_PAGE = 'SET_PAGE';
export const CLEAR_PAGE = 'CLEAR_PAGE';

interface SetPageAction {
    type: typeof SET_PAGE;
    payload: Page;
}

interface ClearPageAction {
    type: typeof CLEAR_PAGE;
}

export type ActionTypes = SetPageAction | ClearPageAction;