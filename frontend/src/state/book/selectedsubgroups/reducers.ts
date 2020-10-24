import { SET_SUBGROUPS, CLEAR_SUBGROUPS, ActionTypes } from './types';

const initialState: string[] = [];

export const subgroupsReducer = (state = initialState, action: ActionTypes): string[] => {
    switch (action.type) {
        case SET_SUBGROUPS:
            return {
                ...action.payload
            };
        case CLEAR_SUBGROUPS:
            return {
                ...initialState
            };
        default:
            return state
    }
};