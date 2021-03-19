import { Devicetype } from '../../../../../backend/src/types/network';
import { SET_DEVICETYPES, ADD_DEVICETYPE, UPDATE_DEVICETYPE, REMOVE_DEVICETYPE, ActionTypes } from './types';

const initialState: Devicetype[] = [];

export const devicetypesReducer = (state = initialState, action: ActionTypes): Devicetype[] => {
    switch (action.type) {
        case SET_DEVICETYPES:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, devicetype) => ({ ...memo, [devicetype.id]: devicetype }),
                    {}
                ),
            }
        case ADD_DEVICETYPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_DEVICETYPE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_DEVICETYPE: 
            return {
                ...(Object.values(state)).filter((devicetype) => (devicetype.id !== action.payload))
            }
        default:
            return state
    }
}

