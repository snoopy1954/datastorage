import { SelectedVersions } from '../../../../../backend/src/types/network';

export const SET_VERSIONS = 'SET_VERSIONS';
export const CLEAR_VERSIONS = 'CLEAR_VERSIONS';

interface SetSelectedVersionsAction {
    type: typeof SET_VERSIONS;
    payload: SelectedVersions;
}

interface ClearSelectedVersionsAction {
    type: typeof CLEAR_VERSIONS;
}

export type ActionTypes = SetSelectedVersionsAction | ClearSelectedVersionsAction;