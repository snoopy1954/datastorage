import { Activity } from '../../../../../backend/src/types/sport';
import { SET_ACTIVITIES, ADD_ACTIVITY, UPDATE_ACTIVITY, REMOVE_ACTIVITY, EXCHANGE_ACTIVITIES, ActionTypes } from './types';

const initialState: Activity[] = [];

export const activitiesReducer = (state = initialState, action: ActionTypes): Activity[] => {
    switch (action.type) {
        case SET_ACTIVITIES:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, activity) => ({ ...memo, [activity.id]: activity }),
                    {}
                ),
            }
        case ADD_ACTIVITY:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ACTIVITY:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ACTIVITY: 
            return {
                ...(Object.values(state)).filter((activity) => (activity.id !== action.payload))
            }
        case EXCHANGE_ACTIVITIES:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

