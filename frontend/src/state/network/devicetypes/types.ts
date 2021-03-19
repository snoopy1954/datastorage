import { Devicetype } from '../../../../../backend/src/types/network';

export const SET_DEVICETYPES = 'SET_DEVICETYPES';
export const ADD_DEVICETYPE  = 'ADD_DEVICETYPE';
export const UPDATE_DEVICETYPE = 'UPDATE_DEVICETYPE';
export const REMOVE_DEVICETYPE = 'REMOVE_DEVICETYPE';

interface SetDevicetypesAction {
    type: typeof SET_DEVICETYPES;
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

export type DispatchSetDevicetypes = (arg: SetDevicetypesAction) => (SetDevicetypesAction);
export type DispatchAddDevicetype = (arg: AddDevicetypeAction) => (AddDevicetypeAction);
export type DispatchUpdateDevicetype = (arg: UpdateDevicetypeAction) => (UpdateDevicetypeAction);
export type DispatchRemoveDevicetype = (arg: RemoveDevicetypeAction) => (RemoveDevicetypeAction);
    
export type ActionTypes = SetDevicetypesAction | AddDevicetypeAction | UpdateDevicetypeAction | RemoveDevicetypeAction;
    