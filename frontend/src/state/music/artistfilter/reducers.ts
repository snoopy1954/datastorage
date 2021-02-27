import { Filter } from '../../../types/music';

import { newFilter} from '../../../utils/music/filter';

import { SET_SELECTED_ARTISTFILTER, CLEAR_SELECTED_ARTISTFILTER, ActionTypes } from './types';


const initialState: Filter = newFilter();

export const artistfilterReducer = (state = initialState, action: ActionTypes): Filter => {
    switch (action.type) {
        case SET_SELECTED_ARTISTFILTER:
            return (
                action.payload
                );
        case CLEAR_SELECTED_ARTISTFILTER:
            return (
                initialState
            );
        default:
            return state
    }
};