import { Devicetype, DevicetypeNoID } from '../../../../../backend/src/types/network';
import { 
    SET_DEVICETYPES, 
    ADD_DEVICETYPE,
    UPDATE_DEVICETYPE,
    REMOVE_DEVICETYPE,
    DispatchSetDevicetypes,
    DispatchAddDevicetype,
    DispatchUpdateDevicetype,
    DispatchRemoveDevicetype
} from './types';

import { create, update, remove, getAll } from "../../../services/network/devicetypes";


export const initializeDevicetypes = () => {
  return async (dispatch: DispatchSetDevicetypes) => {
    const devicetypes = await getAll();
    dispatch({
      type: SET_DEVICETYPES,
      payload: devicetypes,
    });
  }
}

export const addDevicetype = (devicetype: DevicetypeNoID) => {
  return async (dispatch: DispatchAddDevicetype) => {
    const newDevicetype = await create(devicetype);
    dispatch({
      type: ADD_DEVICETYPE,
      payload: newDevicetype
    });
  }
};

export const updateDevicetype = (devicetype: Devicetype) => {
  return async (dispatch: DispatchUpdateDevicetype) => {
    const newDevicetype = await update(devicetype.id, devicetype);
    dispatch({
      type: UPDATE_DEVICETYPE,
      payload: newDevicetype
    });
  }
};
  
export const removeDevicetype = (id: string) => {
  return async (dispatch: DispatchRemoveDevicetype) => {
    await remove(id);
    dispatch({
      type: REMOVE_DEVICETYPE,
      payload: id
    });
  }
};
