import { Cd } from '../../../../../backend/src/types/music';
import { SET_SELECTED_CD, CLEAR_SELECTED_CD, ActionTypes } from './types';

import { emptyCd } from '../../../utils/music/cd';


const initialState: Cd = emptyCd();

export const cdReducer = (state = initialState, action: ActionTypes): Cd => {
    switch (action.type) {
        case SET_SELECTED_CD:
            return (
                action.payload
            );
        case CLEAR_SELECTED_CD:
            return (
                initialState
            );
        default:
            return state
    }
};