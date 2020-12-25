import { Biller } from '../../../../../backend/src/types/axa';

export const SET_SELECTED_BILLER = 'SET_SELECTED_BILLER';
export const CLEAR_SELECTED_BILLER = 'CLEAR_SELECTED_BILLER';

interface SetSelectedBillerAction {
    type: typeof SET_SELECTED_BILLER;
    payload: Biller;
}

interface ClearSelectedBillerAction {
    type: typeof CLEAR_SELECTED_BILLER;
}

export type ActionTypes = SetSelectedBillerAction | ClearSelectedBillerAction;