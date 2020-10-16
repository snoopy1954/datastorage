import { Page, SET_MAINPAGE, CLEAR_MAINPAGE, MainpageActionTypes } from './types';

const initialState: Page = {
    name: ''
};

export const mainpageReducer = (state = initialState, action: MainpageActionTypes): Page => {
    switch (action.type) {
        case SET_MAINPAGE: {
            return {
                ...action.payload
            }
        }
        case CLEAR_MAINPAGE:
            return {
                ...initialState
            }
        default: {
            console.log('das passiert nie')
            return state
        }
    }
}