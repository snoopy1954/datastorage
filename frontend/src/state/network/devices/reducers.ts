import { Device } from '../../../../../backend/src/types/network';

import { SET_DEVICES, ADD_DEVICE, UPDATE_DEVICE, REMOVE_DEVICE, ActionTypes } from './types';

const initialState: Device[] = [];

export const devicesReducer = (state = initialState, action: ActionTypes): Device[] => {
    switch (action.type) {
        case SET_DEVICES:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, device) => ({ ...memo, [device.id]: device }),
                    {}
                ),
            }
        case ADD_DEVICE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_DEVICE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_DEVICE: 
            return {
                ...(Object.values(state)).filter((device) => (device.id !== action.payload))
            }
        default:
            return state
    }
}

