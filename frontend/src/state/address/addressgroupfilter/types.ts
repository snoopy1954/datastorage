export const SET_ADDRESSGROUP_FILTER = 'SET_ADDRESSGROUP_FILTER';
export const CLEAR_ADDRESSGROUP_FILTER = 'CLEAR_ADDRESSGROUP_FILTER';

interface SetAddressgroupFilterAction {
    type: typeof SET_ADDRESSGROUP_FILTER;
    payload: string;
}

interface ClearAddressgroupFilterAction {
    type: typeof CLEAR_ADDRESSGROUP_FILTER;
}

export type ActionTypes = SetAddressgroupFilterAction | ClearAddressgroupFilterAction;