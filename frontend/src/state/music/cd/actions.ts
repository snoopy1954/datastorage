import { Cd } from '../../../../../backend/src/types/music';
import { SET_SELECTED_CD, CLEAR_SELECTED_CD, ActionTypes } from './types';

export const setSelectedCd = (cd: Cd) => {
    const action: ActionTypes = {
        type: SET_SELECTED_CD,
        payload: cd
    };
    
    return action;  
};

export const clearSelectedCd = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_CD
    };
    
    return action;  
};
