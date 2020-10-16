import { Page, SET_MAINPAGE, CLEAR_MAINPAGE, MainpageActionTypes } from './types';

export const setMainpage = (page: Page) => {
    const action: MainpageActionTypes = {
        type: SET_MAINPAGE,
        payload: page
    };
    
    return action;  
}

export const clearMainpage = () => {
    const action: MainpageActionTypes = {
        type: CLEAR_MAINPAGE
    };
    
    return action;  
}
