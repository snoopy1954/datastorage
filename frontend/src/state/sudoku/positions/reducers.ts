import { INITIALIZE_POSITIONS, ActionTypes } from './types';

import { setMatrix, setNumbermatrix, setCandidatematrix } from '../../../utils/sudoku';

const initialState = {
    matrix: setMatrix(),
    numbermatrix: setNumbermatrix(),
    candidatesmatrix: setCandidatematrix()
}

export const positionsReducer = (state = initialState, action: ActionTypes): {} => {
    switch (action.type) {
        case INITIALIZE_POSITIONS:
            return initialState;
        default:
            return state
    }
};