/* eslint-disable no-undef */
import { Binarydata } from '../../../../backend/src/types/image';
import { SET_BINARYDATA, CLEAR_BINARYDATA, ActionTypes } from './types';

const initialState: Binarydata = { 
    id: '', 
    data: Buffer.from(''),
    type: ''
};

export const binarydataReducer = (state = initialState, action: ActionTypes): Binarydata => {
    switch (action.type) {
        case SET_BINARYDATA: {
            return {
                ...action.payload
            }
        }
        case CLEAR_BINARYDATA:
            return {
                ...initialState
            }
        default: {
            return state
        }
    }
}