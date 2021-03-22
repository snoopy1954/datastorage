import { Biller } from '../../../../../backend/src/types/axa';

export const SET_BILLERS = 'SET_BILLERS';
export const ADD_BILLER  = 'ADD_BILLER';
export const UPDATE_BILLER = 'UPDATE_BILLER';
export const REMOVE_BILLER = 'REMOVE_BILLER';
export const EXCHANGE_BILLERS = 'EXCHANGE_BILLERS';

interface SetBillersAction {
    type: typeof SET_BILLERS;
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

interface ExchangeBillersAction {
    type: typeof EXCHANGE_BILLERS;
    payload: Biller[];
}

export type DispatchSetBillers = (arg: SetBillersAction) => (SetBillersAction);
export type DispatchAddBiller = (arg: AddBillerAction) => (AddBillerAction);
export type DispatchUpdateBiller = (arg: UpdateBillerAction) => (UpdateBillerAction);
export type DispatchRemoveBiller = (arg: RemoveBillerAction) => (RemoveBillerAction);
    
export type BillerAction = SetBillersAction | AddBillerAction | UpdateBillerAction | RemoveBillerAction | ExchangeBillersAction;
    