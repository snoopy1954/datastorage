import { Artist, ArtistNoID } from '../../../../../backend/src/types/music';
import { 
    SET_ARTISTS, 
    ADD_ARTIST,
    UPDATE_ARTIST,
    REMOVE_ARTIST,
    EXCHANGE_ARTISTS,
    DispatchSetArtists,
    DispatchAddArtist,
    DispatchUpdateArtist,
    DispatchRemoveArtist
} from './types';

import { create, update, remove, getAll } from "../../../services/music/artist";


export const initializeArtists = () => {
  return async (dispatch: DispatchSetArtists) => {
    const artists = await getAll();
    dispatch({
      type: SET_ARTISTS,
      payload: artists,
    });
  }
};

export const addArtist = (artist: ArtistNoID) => {
  return async (dispatch: DispatchAddArtist) => {
    const newArtist = await create(artist);
    dispatch({
      type: ADD_ARTIST,
      payload: newArtist
    });
  }
};

export const updateArtist = (artist: Artist) => {
  return async (dispatch: DispatchUpdateArtist) => {
    const newArtist = await update(artist.id, artist);
    dispatch({
      type: UPDATE_ARTIST,
      payload: newArtist
    });
  }
};
  
export const removeArtist = (id: string) => {
  return async (dispatch: DispatchRemoveArtist) => {
    await remove(id);
    dispatch({
      type: REMOVE_ARTIST,
      payload: id
    });
  }
};

export const exchangeArtists = (artists: Artist[]) => {
  const action = 
    {
      type: EXCHANGE_ARTISTS,
      payload: artists,
    }
        
    return action;  
};

