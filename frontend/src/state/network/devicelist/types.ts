import { Device } from '../../../../../backend/src/types/network';

export const SET_DEVICE_LIST = 'SET_DEVICE_LIST';
export const ADD_DEVICE  = 'ADD_DEVICE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';

interface SetDeviceListAction {
    type: typeof SET_DEVICE_LIST;
    payload: Device[];
}

interface AddDeviceAction {
    type: typeof ADD_DEVICE;
    payload: Device;
}

interface UpdateDeviceAction {
    type: typeof UPDATE_DEVICE;
    payload: Device;
}

interface RemoveDeviceAction {
    type: typeof REMOVE_DEVICE;
    payload: string;
}

export type DispatchSetDeviceList = (arg: SetDeviceListAction) => (SetDeviceListAction);
export type DispatchAddDevice = (arg: AddDeviceAction) => (AddDeviceAction);
export type DispatchUpdateDevice = (arg: UpdateDeviceAction) => (UpdateDeviceAction);
export type DispatchRemoveDevice = (arg: RemoveDeviceAction) => (RemoveDeviceAction);
    
export type ActionTypes = SetDeviceListAction | AddDeviceAction | UpdateDeviceAction | RemoveDeviceAction;
    