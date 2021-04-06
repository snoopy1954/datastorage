import { TrackToPlay } from '../../../types/music';
import { ADD_TRACK, REMOVE_TRACK, EXCHANGE_TRACKS, ActionTypes } from './types';

export const addTrack = (track: TrackToPlay) => {
  const action: ActionTypes = 
  {
      type: ADD_TRACK,
      payload: track
  }
        
  return action;  
};
  
export const removeTrack = (id: string) => {
  const action: ActionTypes = 
  {
      type: REMOVE_TRACK,
      payload: id
  }
        
  return action;  
};

export const exchangeTracks = (tracks: TrackToPlay[]) => {
  const action: ActionTypes = 
    {
      type: EXCHANGE_TRACKS,
      payload: tracks,
    }
        
    return action;  
};
