import { Movie, MovieNoID } from '../../../../../backend/src/types/movie';
import { 
    SET_MOVIES, 
    ADD_MOVIE,
    UPDATE_MOVIE,
    REMOVE_MOVIE,
    EXCHANGE_MOVIES,
    DispatchSetMovies,
    DispatchAddMovie,
    DispatchUpdateMovie,
    DispatchRemoveMovie
} from './types';

import { create, update, remove, getAll } from "../../../services/movie/movies";


export const initializeMovies = () => {
  return async (dispatch: DispatchSetMovies) => {
    const movies = await getAll();
    dispatch({
      type: SET_MOVIES,
      payload: movies,
    });
  }
}

export const addMovie = (movie: MovieNoID) => {
  return async (dispatch: DispatchAddMovie) => {
    const newMovie = await create(movie);
    dispatch({
      type: ADD_MOVIE,
      payload: newMovie
    });
  }
};

export const updateMovie = (movie: Movie) => {
  return async (dispatch: DispatchUpdateMovie) => {
    const newMovie = await update(movie.id, movie);
    dispatch({
      type: UPDATE_MOVIE,
      payload: newMovie
    });
  }
};
  
export const removeMovie = (id: string) => {
  return async (dispatch: DispatchRemoveMovie) => {
    await remove(id);
    dispatch({
      type: REMOVE_MOVIE,
      payload: id
    });
  }
};

export const exchangeMovies = (movies: Movie[]) => {
  const action = 
    {
      type: EXCHANGE_MOVIES,
      payload: movies,
    }
        
    return action;  
};

