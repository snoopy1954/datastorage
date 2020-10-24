import { Page, SET_PAGE, CLEAR_PAGE, ActionTypes } from './types';

export const setPage = (page: Page) => {
    const action: ActionTypes = {
        type: SET_PAGE,
        payload: page
    };
    
    return action;  
}

export const clearPage = () => {
    const action: ActionTypes = {
        type: CLEAR_PAGE
    };
    
    return action;  
}
