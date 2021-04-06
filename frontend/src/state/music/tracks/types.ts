import { TrackToPlay } from '../../../types/music';

export const ADD_TRACK  = 'ADD_TRACK';
export const REMOVE_TRACK = 'REMOVE_TRACK';
export const EXCHANGE_TRACKS = 'EXCHANGE_TRACKS';

interface AddTrackAction {
    type: typeof ADD_TRACK;
    payload: TrackToPlay;
}

interface RemoveTrackAction {
    type: typeof REMOVE_TRACK;
    payload: string;
}

interface ExchangeTracksAction {
    type: typeof EXCHANGE_TRACKS;
    payload: TrackToPlay[];
}
    
export type ActionTypes = AddTrackAction | RemoveTrackAction | ExchangeTracksAction;
    