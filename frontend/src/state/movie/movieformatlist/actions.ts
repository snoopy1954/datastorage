import { Format, FormatNoID } from '../../../../../backend/src/types/basic';
import { 
    SET_MOVIEFORMAT_LIST, 
    ADD_MOVIEFORMAT,
    UPDATE_MOVIEFORMAT,
    REMOVE_MOVIEFORMAT,
    DispatchSetMovieformatList,
    DispatchAddMovieformat,
    DispatchUpdateMovieformat,
    DispatchRemoveMovieformat
} from './types';

import { create, update, remove, getAll } from "../../../services/movie/movieformats";


export const initializeMovieformats = () => {
  return async (dispatch: DispatchSetMovieformatList) => {
    const movieformats = await getAll();
    dispatch({
      type: SET_MOVIEFORMAT_LIST,
      payload: movieformats,
    });
  }
}

export const addMovieformat = (movieformat: FormatNoID) => {
  return async (dispatch: DispatchAddMovieformat) => {
    const newMovieformat = await create(movieformat);
    dispatch({
      type: ADD_MOVIEFORMAT,
      payload: newMovieformat
    });
  }
};

export const updateMovieformat = (movieformat: Format) => {
  return async (dispatch: DispatchUpdateMovieformat) => {
    const newMovieformat = await update(movieformat.id, movieformat);
    dispatch({
      type: UPDATE_MOVIEFORMAT,
      payload: newMovieformat
    });
  }
};
  
export const removeMovieformat = (id: string) => {
  return async (dispatch: DispatchRemoveMovieformat) => {
    await remove(id);
    dispatch({
      type: REMOVE_MOVIEFORMAT,
      payload: id
    });
  }
};
