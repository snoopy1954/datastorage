import { Devicetype } from '../../../types/network';
import { SET_DEVICETYPE_LIST, ADD_DEVICETYPE, UPDATE_DEVICETYPE, REMOVE_DEVICETYPE, DevicetypeActionTypes } from './types';

const initialState: Devicetype[] = [];

export const devicetypelistReducer = (state = initialState, action: DevicetypeActionTypes): Devicetype[] => {
    switch (action.type) {
        case SET_DEVICETYPE_LIST:
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

