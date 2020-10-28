import { Devicetype } from '../../../../../backend/src/types/network';

export const SET_SELECTED_DEVICETYPE = 'SET_SELECTED_DEVICETYPE';
export const CLEAR_SELECTED_DEVICETYPE = 'CLEAR_SELECTED_DEVICETYPE';

interface SetSelectedDevicetypeAction {
    type: typeof SET_SELECTED_DEVICETYPE;
    payload: Devicetype;
}

interface ClearSelectedDevicetypeAction {
    type: typeof CLEAR_SELECTED_DEVICETYPE;
}

export type ActionTypes = SetSelectedDevicetypeAction | ClearSelectedDevicetypeAction;