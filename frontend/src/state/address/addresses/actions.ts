import { Address, AddressNoID } from '../../../../../backend/src/types/address';
import { 
    SET_ADDRESSES, 
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    REMOVE_ADDRESS,
    EXCHANGE_ADDRESSES,
    DispatchSetAddresses,
    DispatchAddAddress,
    DispatchUpdateAddress,
    DispatchRemoveAddress
} from './types';

import { create, update, remove, getAll } from '../../../services/address/addresses';


export const initializeAddresses = () => {
  return async (dispatch: DispatchSetAddresses) => {
    const addresses = await getAll();
    dispatch({
      type: SET_ADDRESSES,
      payload: addresses,
    });
  }
}

export const addAddress = (address: AddressNoID) => {
  return async (dispatch: DispatchAddAddress) => {
    const newAddress = await create(address);
    dispatch({
      type: ADD_ADDRESS,
      payload: newAddress
    });
  }
};

export const updateAddress = (address: Address) => {
  return async (dispatch: DispatchUpdateAddress) => {
    const newAddress = await update(address.id, address);
    dispatch({
      type: UPDATE_ADDRESS,
      payload: newAddress
    });
  }
};
  
export const removeAddress = (id: string) => {
  return async (dispatch: DispatchRemoveAddress) => {
    await remove(id);
    dispatch({
      type: REMOVE_ADDRESS,
      payload: id
    });
  }
};

export const exchangeAddresses = (addresses: Address[]) => {
  const action = 
    {
      type: EXCHANGE_ADDRESSES,
      payload: addresses,
    }
        
    return action;  
};
