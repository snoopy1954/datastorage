import { Biller } from '../../../../../backend/src/types/axa';

export const ADD_CHANGED_BILLER  = 'ADD_CHANGED_BILLER';
export const CLEAR_CHANGED_BILLER  = 'CLEAR_CHANGED_BILLER';

interface AddChangedBillerAction {
    type: typeof ADD_CHANGED_BILLER;
    payload: Biller;
}

interface ClearChangedBillerAction {
    type: typeof CLEAR_CHANGED_BILLER;
}
    
export type ActionTypes = AddChangedBillerAction | ClearChangedBillerAction;
    