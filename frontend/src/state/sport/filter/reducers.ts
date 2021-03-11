import { Filter } from '../../../types/document';
import { newFilter } from '../../../utils/document/document';

import { SET_DOCUMENTFILTER, CLEAR_DOCUMENTFILTER, ActionTypes } from './types';

const initialState: Filter = newFilter();

export const documentfilterReducer = (state = initialState, action: ActionTypes): Filter => {
    switch (action.type) {
        case SET_DOCUMENTFILTER: 
            return {
                ...action.payload
            }
        case CLEAR_DOCUMENTFILTER:
            return {
                ...initialState
            }
        default: {
            return state
        }
    }
}