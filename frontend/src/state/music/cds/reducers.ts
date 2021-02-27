import { Cd } from '../../../../../backend/src/types/music';
import { SET_CDS, ADD_CD, UPDATE_CD, REMOVE_CD, EXCHANGE_CDS, ActionTypes } from './types';

const initialState: Cd[] = [];

export const cdsReducer = (state = initialState, action: ActionTypes): Cd[] => {
    switch (action.type) {
        case SET_CDS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, cd) => ({ ...memo, [cd.id]: cd }),
                    {}
                ),
            }
        case ADD_CD:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_CD:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_CD: 
            return {
                ...(Object.values(state)).filter((cd) => (cd.id !== action.payload))
            }
        case EXCHANGE_CDS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

