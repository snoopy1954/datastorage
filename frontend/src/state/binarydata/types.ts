import { Binarydata } from '../../../../backend/src/types/image';

export const SET_BINARYDATA = 'SET_BINARYDATA';
export const CLEAR_BINARYDATA = 'CLEAR_BINARYDATA';

interface SetBinarydataAction {
    type: typeof SET_BINARYDATA;
    payload: Binarydata;
}

interface ClearBinarydataAction {
    type: typeof CLEAR_BINARYDATA;
}

export type DispatchSetBinarydata = (arg: SetBinarydataAction) => (SetBinarydataAction);
export type DispatchClearBinarydata = (arg: ClearBinarydataAction) => (ClearBinarydataAction);

export type ActionTypes = SetBinarydataAction | ClearBinarydataAction;