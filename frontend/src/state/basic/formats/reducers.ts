import { Format } from '../../../../../backend/src/types/basic';

import { SET_FORMATS, ADD_FORMAT, UPDATE_FORMAT, REMOVE_FORMAT, ActionTypes } from './types';

const initialState: Format[] = [];

export const formatsReducer = (state = initialState, action: ActionTypes): Format[] => {
    switch (action.type) {
        case SET_FORMATS:
            return {
                ...initialState,
                ...action.payload.reduce(
                    (memo, format) => ({ ...memo, [format.name]: format }),
                    {}
                ),
            }

        case ADD_FORMAT:
            return {
                ...state,
                [action.payload.name]: action.payload
            }
        case UPDATE_FORMAT:
            return {
                ...state,
                [action.payload.name]: action.payload
            }
        case REMOVE_FORMAT: 
            return {
                ...(Object.values(state)).filter((format) => (format.id !== action.payload))
            }

        default:
            return state
    }
}