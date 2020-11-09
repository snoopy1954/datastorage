export const INITIALIZE_CANDIDATES = 'INITIALIZE_CANDIDATES';
export const SET_CANDIDATES = 'SET_CANDIDATES';
export const SET_CANDIDATE = 'SET_CANDIDATE';
export const CLEAR_CANDIDATE= 'CLEAR_CANDIDATE';

interface InitializeCandidatesAction {
    type: typeof INITIALIZE_CANDIDATES;
}

interface SetCandidatesAction {
    type: typeof SET_CANDIDATES;
    payload: boolean[];
}

interface SetCandidateAction {
    type: typeof SET_CANDIDATE;
    payload: number;
}

interface ClearCandidateAction {
    type: typeof CLEAR_CANDIDATE;
    payload: number;
}

export type ActionTypes = InitializeCandidatesAction | SetCandidatesAction | SetCandidateAction | ClearCandidateAction;