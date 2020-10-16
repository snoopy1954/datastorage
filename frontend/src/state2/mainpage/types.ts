export interface Page {
    name: string;
}

export const SET_MAINPAGE = 'SET_MAINPAGE';
export const CLEAR_MAINPAGE = 'CLEAR_MAINPAGE';

interface SetMainpageAction {
    type: typeof SET_MAINPAGE;
    payload: Page;
}

interface ClearMainpageAction {
    type: typeof CLEAR_MAINPAGE;
}

export type MainpageActionTypes = SetMainpageAction | ClearMainpageAction;