import { Address } from '../../../../../backend/src/types/address';

export const ADD_CHANGED_ADDRESS  = 'ADD_CHANGED_ADDRESS';
export const CLEAR_CHANGED_ADDRESS  = 'CLEAR_CHANGED_ADDRESS';

interface AddChangedAddressAction {
    type: typeof ADD_CHANGED_ADDRESS;
    payload: Address;
}

interface ClearChangedAddressAction {
    type: typeof CLEAR_CHANGED_ADDRESS;
}
    
export type ActionTypes = AddChangedAddressAction | ClearChangedAddressAction;
    