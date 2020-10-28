import { Device } from '../../../../../backend/src/types/network';

import { SET_DEVICE_LIST, ADD_DEVICE, UPDATE_DEVICE, REMOVE_DEVICE, ActionTypes } from './types';

const initialState: Device[] = [];

export const devicelistReducer = (state = initialState, action: ActionTypes): Device[] => {
    switch (action.type) {
        case SET_DEVICE_LIST:
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

