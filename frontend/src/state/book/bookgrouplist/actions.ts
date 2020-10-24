import { Bookgroup, BookgroupNoID } from '../../../types/book';
import { 
    SET_BOOKGROUP_LIST, 
    ADD_BOOKGROUP,
    UPDATE_BOOKGROUP,
    REMOVE_BOOKGROUP,
    DispatchSetBookgroupList,
    DispatchAddBookgroup,
    DispatchUpdateBookgroup,
    DispatchRemoveBookgroup
} from './types';

import { create, update, remove, getAll } from "../../../services/book/bookgroups";


export const initializeBookgroups = () => {
  return async (dispatch: DispatchSetBookgroupList) => {
    const bookgroups = await getAll();
    dispatch({
      type: SET_BOOKGROUP_LIST,
      payload: bookgroups,
    });
  }
}

export const addBookgroup = (bookgroup: BookgroupNoID) => {
  return async (dispatch: DispatchAddBookgroup) => {
    const newBookgroup = await create(bookgroup);
    dispatch({
      type: ADD_BOOKGROUP,
      payload: newBookgroup
    });
  }
};

export const updateBookgroup = (bookgroup: Bookgroup) => {
  return async (dispatch: DispatchUpdateBookgroup) => {
    const newBookgroup = await update(bookgroup.id, bookgroup);
    dispatch({
      type: UPDATE_BOOKGROUP,
      payload: newBookgroup
    });
  }
};
  
export const removeBookgroup = (id: string) => {
  return async (dispatch: DispatchRemoveBookgroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_BOOKGROUP,
      payload: id
    });
  }
};
