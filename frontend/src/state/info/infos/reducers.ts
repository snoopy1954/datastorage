import { Info } from '../../../../../backend/src/types/logging';
import { SET_COMMENT, UPDATE_COMMENT, ActionTypes } from './types';

import { emptyInfo } from '../../../utils/info/info';


const initialState: Info = emptyInfo();

export const infosReducer = (state = initialState, action: ActionTypes): Info => {
    switch (action.type) {
        case SET_COMMENT:
            return (
                action.payload
            )
        case UPDATE_COMMENT:
            return (
                action.payload
            )
        default:
            return state
    }
}

