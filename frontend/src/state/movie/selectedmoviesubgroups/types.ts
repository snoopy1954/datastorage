export const SET_MOVIESUBGROUPS = 'SET_MOVIESUBGROUPS';
export const CLEAR_MOVIESUBGROUPS = 'CLEAR_MOVIESUBGROUPS';

interface SetSelectedMoviesubgroupsAction {
    type: typeof SET_MOVIESUBGROUPS;
    payload: string[];
}

interface ClearSelectedMoviesubgroupsAction {
    type: typeof CLEAR_MOVIESUBGROUPS;
}

export type ActionTypes = SetSelectedMoviesubgroupsAction | ClearSelectedMoviesubgroupsAction;