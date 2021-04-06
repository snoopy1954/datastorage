import { TrackToPlay } from '../../../types/music';
import { ADD_TRACK, REMOVE_TRACK, EXCHANGE_TRACKS, ActionTypes } from './types';

const initialState: TrackToPlay[] = [];

export const tracksReducer = (state = initialState, action: ActionTypes): TrackToPlay[] => {
    switch (action.type) {
        case ADD_TRACK: {
            return {
                ...Object.values(state).concat(action.payload)
            }
        }
        case REMOVE_TRACK: 
            return {
                ...Object.values(state).filter(track => (track.id !== action.payload))
            }
        case EXCHANGE_TRACKS:
            return {
                ...state
            }
        default:
            return state
    }
}

