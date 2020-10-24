import { SET_ADDRESSGROUP_FILTER, CLEAR_ADDRESSGROUP_FILTER, ActionTypes } from './types';

const initialState = '';

export const addressgroupfilterReducer = (state = initialState, action: ActionTypes): string => {
    switch (action.type) {
        case SET_ADDRESSGROUP_FILTER: 
            return (
                action.payload
            )
        case CLEAR_ADDRESSGROUP_FILTER:
            return (
                initialState
            )
        default: {
            console.log('das passiert nie')
            return state
        }
    }
}