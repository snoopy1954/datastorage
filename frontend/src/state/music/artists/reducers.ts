import { Artist } from '../../../../../backend/src/types/music';
import { SET_ARTISTS, ADD_ARTIST, UPDATE_ARTIST, REMOVE_ARTIST, EXCHANGE_ARTISTS, ActionTypes } from './types';

const initialState: Artist[] = [];

export const artistsReducer = (state = initialState, action: ActionTypes): Artist[] => {
    switch (action.type) {
        case SET_ARTISTS:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, artist) => ({ ...memo, [artist.id]: artist }),
                    {}
                ),
            }
        case ADD_ARTIST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ARTIST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ARTIST: 
            return {
                ...(Object.values(state)).filter((artist) => (artist.id !== action.payload))
            }
        case EXCHANGE_ARTISTS:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

