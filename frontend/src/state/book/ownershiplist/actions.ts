import { Ownership, OwnershipNoID } from '../../../types/book';
import { 
    SET_OWNERSHIP_LIST, 
    ADD_OWNERSHIP,
    UPDATE_OWNERSHIP,
    REMOVE_OWNERSHIP,
    DispatchSetOwnershipList,
    DispatchAddOwnership,
    DispatchUpdateOwnership,
    DispatchRemoveOwnership
} from './types';

import { create, update, remove, getAll } from "../../../services/book/ownerships";


export const initializeOwnerships = () => {
  return async (dispatch: DispatchSetOwnershipList) => {
    const ownerships = await getAll();
    dispatch({
      type: SET_OWNERSHIP_LIST,
      payload: ownerships,
    });
  }
}

export const addOwnership = (ownership: OwnershipNoID) => {
  return async (dispatch: DispatchAddOwnership) => {
    const newOwnership = await create(ownership);
    dispatch({
      type: ADD_OWNERSHIP,
      payload: newOwnership
    });
  }
};

export const updateOwnership = (ownership: Ownership) => {
  return async (dispatch: DispatchUpdateOwnership) => {
    const newOwnership = await update(ownership.id, ownership);
    dispatch({
      type: UPDATE_OWNERSHIP,
      payload: newOwnership
    });
  }
};
  
export const removeOwnership = (id: string) => {
  return async (dispatch: DispatchRemoveOwnership) => {
    await remove(id);
    dispatch({
      type: REMOVE_OWNERSHIP,
      payload: id
    });
  }
};
