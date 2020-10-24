import { Addressgroup, AddressgroupNoID } from '../../../../../backend/src/types/addressTypes';
import { 
    SET_ADDRESSGROUP_LIST, 
    ADD_ADDRESSGROUP,
    UPDATE_ADDRESSGROUP,
    REMOVE_ADDRESSGROUP,
    DispatchSetAddressgroupList,
    DispatchAddAddressgroup,
    DispatchUpdateAddressgroup,
    DispatchRemoveAddressgroup
} from './types';

import { create, update, remove, getAll } from "../../../services/address/addressgroups";


export const initializeAddressgroups = () => {
  return async (dispatch: DispatchSetAddressgroupList) => {
    const addressgroups = await getAll();
    dispatch({
      type: SET_ADDRESSGROUP_LIST,
      payload: addressgroups,
    });
  }
}

export const addAddressgroup = (addressgroup: AddressgroupNoID) => {
  return async (dispatch: DispatchAddAddressgroup) => {
    const newAddressgroup = await create(addressgroup);
    dispatch({
      type: ADD_ADDRESSGROUP,
      payload: newAddressgroup
    });
  }
};

export const updateAddressgroup = (addressgroup: Addressgroup) => {
  return async (dispatch: DispatchUpdateAddressgroup) => {
    const newAddressgroup = await update(addressgroup.id, addressgroup);
    dispatch({
      type: UPDATE_ADDRESSGROUP,
      payload: newAddressgroup
    });
  }
};
  
export const removeAddressgroup = (id: string) => {
  return async (dispatch: DispatchRemoveAddressgroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_ADDRESSGROUP,
      payload: id
    });
  }
};
