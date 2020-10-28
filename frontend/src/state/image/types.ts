import { Image } from '../../../../backend/src/types/image';

export const SET_IMAGE = 'SET_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';

interface SetImageAction {
    type: typeof SET_IMAGE;
    payload: Image;
}

interface ClearImageAction {
    type: typeof CLEAR_IMAGE;
}

export type DispatchSetImage = (arg: SetImageAction) => (SetImageAction);
export type DispatchClearImage = (arg: ClearImageAction) => (ClearImageAction);

export type ActionTypes = SetImageAction | ClearImageAction;