import { Address } from '../../../../../backend/src/types/addressTypes';

export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST';
export const ADD_ADDRESS  = 'ADD_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';

interface SetAddressListAction {
    type: typeof SET_ADDRESS_LIST;
    payload: Address[];
}

interface AddAddressAction {
    type: typeof ADD_ADDRESS;
    payload: Address;
}

interface UpdateAddressAction {
    type: typeof UPDATE_ADDRESS;
    payload: Address;
}

interface RemoveAddressAction {
    type: typeof REMOVE_ADDRESS;
    payload: string;
}

export type DispatchSetAddressList = (arg: SetAddressListAction) => (SetAddressListAction);
export type DispatchAddAddress = (arg: AddAddressAction) => (AddAddressAction);
export type DispatchUpdateAddress = (arg: UpdateAddressAction) => (UpdateAddressAction);
export type DispatchRemoveAddress = (arg: RemoveAddressAction) => (RemoveAddressAction);
    
export type ActionTypes = SetAddressListAction | AddAddressAction | UpdateAddressAction | RemoveAddressAction;
    