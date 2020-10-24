import { Image } from '../../types/image';
import { SET_IMAGE, CLEAR_IMAGE, ActionTypes } from './types';

// eslint-disable-next-line no-undef
const initialState: Image = { id: '', data: Buffer.from('')};

export const imageReducer = (state = initialState, action: ActionTypes): Image => {
    switch (action.type) {
        case SET_IMAGE: {
            return {
                ...action.payload
            }
        }
        case CLEAR_IMAGE:
            return {
                ...initialState
            }
        default: {
            console.log('das passiert nie')
            return state
        }
    }
}