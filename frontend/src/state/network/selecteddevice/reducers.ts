import { Device } from '../../../types/network';
import { SET_SELECTED_DEVICE, CLEAR_SELECTED_DEVICE, ActionTypes } from './types';

const initialState: Device = {
    id: "",
    name: "",
    description: "",
    devicetype: "",
    networks: [{
      hostname: "",
      mac: "",
      ip: ""
    }],
    osversions: [{
      name: "",
      supplement: "",
      version: ""
    }],
    comment: "",
    createdAt: new Date(),
    modifiedAt: new Date()
};

export const selecteddeviceReducer = (state = initialState, action: ActionTypes): Device => {
    switch (action.type) {
        case SET_SELECTED_DEVICE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_DEVICE:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};