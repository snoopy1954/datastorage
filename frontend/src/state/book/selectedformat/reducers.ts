import { Format } from '../../../../../backend/src/types/book';
import { SET_SELECTED_FORMAT, CLEAR_SELECTED_FORMAT, ActionTypes } from './types';

import { emptyFormat } from '../../../utils/book/format';


const initialState: Format = emptyFormat();

export const selectedformatReducer = (state = initialState, action: ActionTypes): Format => {
    switch (action.type) {
        case SET_SELECTED_FORMAT:
            return (
                action.payload
            );
        case CLEAR_SELECTED_FORMAT:
            return (
                initialState
            );
        default:
            return state
    }
};