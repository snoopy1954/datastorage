import { SelectedVersions } from '../../../../../backend/src/types/network';
import { SET_VERSIONS, CLEAR_VERSIONS, ActionTypes } from './types';

const initialState: SelectedVersions[] = [];

export const versionsReducer = (state = initialState, action: ActionTypes): SelectedVersions[] => {
    switch (action.type) {
        case SET_VERSIONS:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case CLEAR_VERSIONS:
            return {
                ...initialState
            };
        default:
            return state
    }
};