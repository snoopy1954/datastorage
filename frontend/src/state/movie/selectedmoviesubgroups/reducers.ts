import { SET_MOVIESUBGROUPS, CLEAR_MOVIESUBGROUPS, ActionTypes } from './types';

const initialState: string[] = [];

export const moviesubgroupsReducer = (state = initialState, action: ActionTypes): string[] => {
    switch (action.type) {
        case SET_MOVIESUBGROUPS:
            return {
                ...action.payload
            };
        case CLEAR_MOVIESUBGROUPS:
            return {
                ...initialState
            };
        default:
            return state
    }
};