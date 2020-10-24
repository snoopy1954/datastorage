import { Device, DeviceNoID } from '../../../types/network';
import { 
    SET_DEVICE_LIST, 
    ADD_DEVICE,
    UPDATE_DEVICE,
    REMOVE_DEVICE,
    DispatchSetDeviceList,
    DispatchAddDevice,
    DispatchUpdateDevice,
    DispatchRemoveDevice
} from './types';

import { create, update, remove, getAll } from "../../../services/device/devices";

import { sortDeviceList } from "../../../utils/network";


export const initializeDevices = () => {
  return async (dispatch: DispatchSetDeviceList) => {
    const devices = sortDeviceList(await getAll());
    dispatch({
      type: SET_DEVICE_LIST,
      payload: devices,
    });
  }
}

export const addDevice = (device: DeviceNoID) => {
  return async (dispatch: DispatchAddDevice) => {
    const newDevice = await create(device);
    dispatch({
      type: ADD_DEVICE,
      payload: newDevice
    });
  }
};

export const updateDevice = (device: Device) => {
  return async (dispatch: DispatchUpdateDevice) => {
    const newDevice = await update(device.id, device);
    dispatch({
      type: UPDATE_DEVICE,
      payload: newDevice
    });
  }
};
  
export const removeDevice = (id: string) => {
  return async (dispatch: DispatchRemoveDevice) => {
    await remove(id);
    dispatch({
      type: REMOVE_DEVICE,
      payload: id
    });
  }
};
