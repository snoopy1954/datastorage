import { Addressgroup } from '../../../../../backend/src/types/addressTypes';

export const SET_ADDRESSGROUP_LIST = 'SET_ADDRESSGROUP_LIST';
export const ADD_ADDRESSGROUP  = 'ADD_ADDRESSGROUP';
export const UPDATE_ADDRESSGROUP = 'UPDATE_ADDRESSGROUP';
export const REMOVE_ADDRESSGROUP = 'REMOVE_ADDRESSGROUP';

interface SetAddressgroupListAction {
    type: typeof SET_ADDRESSGROUP_LIST;
    payload: Addressgroup[];
}

interface AddAddressgroupAction {
    type: typeof ADD_ADDRESSGROUP;
    payload: Addressgroup;
}

interface UpdateAddressgroupAction {
    type: typeof UPDATE_ADDRESSGROUP;
    payload: Addressgroup;
}

interface RemoveAddressgroupAction {
    type: typeof REMOVE_ADDRESSGROUP;
    payload: string;
}

export type DispatchSetAddressgroupList = (arg: SetAddressgroupListAction) => (SetAddressgroupListAction);
export type DispatchAddAddressgroup = (arg: AddAddressgroupAction) => (AddAddressgroupAction);
export type DispatchUpdateAddressgroup = (arg: UpdateAddressgroupAction) => (UpdateAddressgroupAction);
export type DispatchRemoveAddressgroup = (arg: RemoveAddressgroupAction) => (RemoveAddressgroupAction);
    
export type ActionTypes = SetAddressgroupListAction | AddAddressgroupAction | UpdateAddressgroupAction | RemoveAddressgroupAction;
    