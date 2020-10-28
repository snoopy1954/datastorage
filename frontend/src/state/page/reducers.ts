import { Page, SET_PAGE, CLEAR_PAGE, ActionTypes } from './types';

const initialState: Page = {
    mainpage: '',
    subpage: ''
};

export const pageReducer = (state = initialState, action: ActionTypes): Page => {
    switch (action.type) {
        case SET_PAGE: {
            return {
                ...action.payload
            }
        }
        case CLEAR_PAGE:
            return {
                ...initialState
            }
        default: {
            return state
        }
    }
}