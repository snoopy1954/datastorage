import { Movie } from '../../../../../backend/src/types/movie';
import { ADD_CHANGED_MOVIE, CLEAR_CHANGED_MOVIE, ActionTypes } from './types';


export const addChangedMovie = (movie: Movie) => {
  const action: ActionTypes = 
    {
      type: ADD_CHANGED_MOVIE,
      payload: movie
    }
        
    return action;  
}

export const clearChangedMovie = () => {
  const action: ActionTypes = 
    {
      type: CLEAR_CHANGED_MOVIE
    }
        
    return action;  
}

