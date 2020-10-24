import { Device } from '../../../types/network';

export const SET_SELECTED_DEVICE = 'SET_SELECTED_DEVICE';
export const CLEAR_SELECTED_DEVICE = 'CLEAR_SELECTED_DEVICE';

interface SetSelectedDeviceAction {
    type: typeof SET_SELECTED_DEVICE;
    payload: Device;
}

interface ClearSelectedDeviceAction {
    type: typeof CLEAR_SELECTED_DEVICE;
}

export type ActionTypes = SetSelectedDeviceAction | ClearSelectedDeviceAction;