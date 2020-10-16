import { Devicetype } from '../../../types/network';

export const SET_DEVICETYPE_LIST = 'SET_DEVICETYPE_LIST';
export const ADD_DEVICETYPE  = 'ADD_DEVICETYPE';
export const UPDATE_DEVICETYPE = 'UPDATE_DEVICETYPE';
export const REMOVE_DEVICETYPE = 'REMOVE_DEVICETYPE';

interface SetDevicetypeListAction {
    type: typeof SET_DEVICETYPE_LIST;
    payload: Devicetype[];
}

interface AddDevicetypeAction {
    type: typeof ADD_DEVICETYPE;
    payload: Devicetype;
}

interface UpdateDevicetypeAction {
    type: typeof UPDATE_DEVICETYPE;
    payload: Devicetype;
}

interface RemoveDevicetypeAction {
    type: typeof REMOVE_DEVICETYPE;
    payload: string;
}

export type DispatchSetDevicetypeList = (arg: SetDevicetypeListAction) => (SetDevicetypeListAction);
export type DispatchAddDevicetype = (arg: AddDevicetypeAction) => (AddDevicetypeAction);
export type DispatchUpdateDevicetype = (arg: UpdateDevicetypeAction) => (UpdateDevicetypeAction);
export type DispatchRemoveDevicetype = (arg: RemoveDevicetypeAction) => (RemoveDevicetypeAction);
    
export type DevicetypeActionTypes = SetDevicetypeListAction | AddDevicetypeAction | UpdateDevicetypeAction | RemoveDevicetypeAction;
    