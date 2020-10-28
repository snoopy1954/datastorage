/* eslint-disable no-undef */
import { Image } from '../../../../backend/src/types/image';
import { SET_IMAGE, CLEAR_IMAGE, ActionTypes } from './types';

const initialState: Image = { 
    id: '', 
    filename: '',
    filetype: '',
    filesize: '',
    image: {
        data: Buffer.from(''),
        contentType: ''
    }
};

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
            return state
        }
    }
}