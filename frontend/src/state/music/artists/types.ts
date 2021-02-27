import { Artist } from '../../../../../backend/src/types/music';

export const SET_ARTISTS = 'SET_ARTISTS';
export const ADD_ARTIST  = 'ADD_ARTIST';
export const UPDATE_ARTIST = 'UPDATE_ARTIST';
export const REMOVE_ARTIST = 'REMOVE_ARTIST';
export const EXCHANGE_ARTISTS = 'EXCHANGE_ARTISTS';

interface SetArtistsAction {
    type: typeof SET_ARTISTS;
    payload: Artist[];
}

interface AddArtistAction {
    type: typeof ADD_ARTIST;
    payload: Artist;
}

interface UpdateArtistAction {
    type: typeof UPDATE_ARTIST;
    payload: Artist;
}

interface RemoveArtistAction {
    type: typeof REMOVE_ARTIST;
    payload: string;
}

interface ExchangeArtistsAction {
    type: typeof EXCHANGE_ARTISTS;
    payload: Artist[];
}

export type DispatchSetArtists = (arg: SetArtistsAction) => (SetArtistsAction);
export type DispatchAddArtist = (arg: AddArtistAction) => (AddArtistAction);
export type DispatchUpdateArtist = (arg: UpdateArtistAction) => (UpdateArtistAction);
export type DispatchRemoveArtist = (arg: RemoveArtistAction) => (RemoveArtistAction);
    
export type ActionTypes = SetArtistsAction | AddArtistAction | UpdateArtistAction | RemoveArtistAction | ExchangeArtistsAction;
    