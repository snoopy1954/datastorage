import { Artist } from '../../../../../backend/src/types/music';
import { SET_SELECTED_ARTIST, CLEAR_SELECTED_ARTIST, ActionTypes } from './types';

import { emptyArtist } from '../../../utils/music/artist';


const initialState: Artist = emptyArtist();

export const artistReducer = (state = initialState, action: ActionTypes): Artist => {
    switch (action.type) {
        case SET_SELECTED_ARTIST:
            return (
                action.payload
            );
        case CLEAR_SELECTED_ARTIST:
            return (
                initialState
            );
        default:
            return state
    }
};