export const SET_SUBGROUPS = 'SET_SUBGROUPS';
export const CLEAR_SUBGROUPS = 'CLEAR_SUBGROUPS';

interface SetSelectedSubgroupsAction {
    type: typeof SET_SUBGROUPS;
    payload: string[];
}

interface ClearSelectedSubgroupsAction {
    type: typeof CLEAR_SUBGROUPS;
}

export type ActionTypes = SetSelectedSubgroupsAction | ClearSelectedSubgroupsAction;