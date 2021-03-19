import { Address } from '../../../../../backend/src/types/address';

export const SET_ADDRESSES = 'SET_ADDRESSES';
export const ADD_ADDRESS  = 'ADD_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
export const EXCHANGE_ADDRESSES = 'EXCHANGE_ADDRESSES';

interface SetAddressesAction {
    type: typeof SET_ADDRESSES;
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

interface ExchangeAddressesAction {
    type: typeof EXCHANGE_ADDRESSES;
    payload: Address[];
}

export type DispatchSetAddresses = (arg: SetAddressesAction) => (SetAddressesAction);
export type DispatchAddAddress = (arg: AddAddressAction) => (AddAddressAction);
export type DispatchUpdateAddress = (arg: UpdateAddressAction) => (UpdateAddressAction);
export type DispatchRemoveAddress = (arg: RemoveAddressAction) => (RemoveAddressAction);
    
export type ActionTypes = SetAddressesAction | AddAddressAction | UpdateAddressAction | RemoveAddressAction | ExchangeAddressesAction;
    