import { Address } from '../../../../../backend/src/types/addressTypes';

export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const CLEAR_SELECTED_ADDRESS = 'CLEAR_SELECTED_ADDRESS';

interface SetSelectedAddressAction {
    type: typeof SET_SELECTED_ADDRESS;
    payload: Address;
}

interface ClearSelectedAddressAction {
    type: typeof CLEAR_SELECTED_ADDRESS;
}

export type ActionTypes = SetSelectedAddressAction | ClearSelectedAddressAction;