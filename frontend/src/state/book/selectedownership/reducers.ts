import { Ownership } from '../../../../../backend/src/types/book';
import { SET_SELECTED_OWNERSHIP, CLEAR_SELECTED_OWNERSHIP, ActionTypes } from './types';

import { emptyOwnership } from '../../../utils/book/ownership';


const initialState: Ownership = emptyOwnership();

export const selectedownershipReducer = (state = initialState, action: ActionTypes): Ownership => {
    switch (action.type) {
        case SET_SELECTED_OWNERSHIP:
            return ( 
                action.payload
            );
        case CLEAR_SELECTED_OWNERSHIP:
            return (
                initialState
            );
        default:
            return state
    }
};