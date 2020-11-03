import { Moviegroup, MoviegroupNoID } from '../../../../../backend/src/types/movie';
import { 
    SET_MOVIEGROUP_LIST, 
    ADD_MOVIEGROUP,
    UPDATE_MOVIEGROUP,
    REMOVE_MOVIEGROUP,
    DispatchSetMoviegroupList,
    DispatchAddMoviegroup,
    DispatchUpdateMoviegroup,
    DispatchRemoveMoviegroup
} from './types';

import { create, update, remove, getAll } from "../../../services/movie/moviegroups";


export const initializeMoviegroups = () => {
  return async (dispatch: DispatchSetMoviegroupList) => {
    const moviegroups = await getAll();
    dispatch({
      type: SET_MOVIEGROUP_LIST,
      payload: moviegroups,
    });
  }
}

export const addMoviegroup = (moviegroup: MoviegroupNoID) => {
  return async (dispatch: DispatchAddMoviegroup) => {
    const newMoviegroup = await create(moviegroup);
    dispatch({
      type: ADD_MOVIEGROUP,
      payload: newMoviegroup
    });
  }
};

export const updateMoviegroup = (moviegroup: Moviegroup) => {
  return async (dispatch: DispatchUpdateMoviegroup) => {
    const newMoviegroup = await update(moviegroup.id, moviegroup);
    dispatch({
      type: UPDATE_MOVIEGROUP,
      payload: newMoviegroup
    });
  }
};
  
export const removeMoviegroup = (id: string) => {
  return async (dispatch: DispatchRemoveMoviegroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_MOVIEGROUP,
      payload: id
    });
  }
};
