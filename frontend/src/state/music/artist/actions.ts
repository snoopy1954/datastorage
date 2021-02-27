import { Artist } from '../../../../../backend/src/types/music';
import { SET_SELECTED_ARTIST, CLEAR_SELECTED_ARTIST, ActionTypes } from './types';

export const setSelectedArtist = (artist: Artist) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ARTIST,
        payload: artist
    };
    
    return action;  
};

export const clearSelectedArtist = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ARTIST
    };
    
    return action;  
};
