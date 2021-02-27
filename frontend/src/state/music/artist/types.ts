import { Artist } from '../../../../../backend/src/types/music';

export const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
export const CLEAR_SELECTED_ARTIST = 'CLEAR_SELECTED_ARTIST';

interface SetSelectedArtistAction {
    type: typeof SET_SELECTED_ARTIST;
    payload: Artist;
}

interface ClearSelectedArtistAction {
    type: typeof CLEAR_SELECTED_ARTIST;
}

export type ActionTypes = SetSelectedArtistAction | ClearSelectedArtistAction;