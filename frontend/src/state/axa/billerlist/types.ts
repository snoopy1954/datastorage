import { Biller } from '../../../../../backend/src/types/axa';

export const SET_BILLER_LIST = 'SET_BILLER_LIST';
export const ADD_BILLER  = 'ADD_BILLER';
export const UPDATE_BILLER = 'UPDATE_BILLER';
export const REMOVE_BILLER = 'REMOVE_BILLER';

interface SetBillerListAction {
    type: typeof SET_BILLER_LIST;
    payload: Biller[];
}

interface AddBillerAction {
    type: typeof ADD_BILLER;
    payload: Biller;
}

interface UpdateBillerAction {
    type: typeof UPDATE_BILLER;
    payload: Biller;
}

interface RemoveBillerAction {
    type: typeof REMOVE_BILLER;
    payload: string;
}

export type DispatchSetBillerList = (arg: SetBillerListAction) => (SetBillerListAction);
export type DispatchAddBiller = (arg: AddBillerAction) => (AddBillerAction);
export type DispatchUpdateBiller = (arg: UpdateBillerAction) => (UpdateBillerAction);
export type DispatchRemoveBiller = (arg: RemoveBillerAction) => (RemoveBillerAction);
    
export type BillerActionTypes = SetBillerListAction | AddBillerAction | UpdateBillerAction | RemoveBillerAction;
    