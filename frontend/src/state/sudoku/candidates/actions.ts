import { INITIALIZE_CANDIDATES, SET_CANDIDATES, SET_CANDIDATE, CLEAR_CANDIDATE, ActionTypes } from './types';

export const initializeCandidates = () => {
    const action: ActionTypes = {
        type: INITIALIZE_CANDIDATES
    };
    
    return action;  
}

export const setCandidates = (candidates: boolean[]) => {
    const action: ActionTypes = {
        type: SET_CANDIDATES,
        payload: candidates
    };
    
    return action;  
}

export const setCandidate = (candidate: number) => {
    const action: ActionTypes = {
        type: SET_CANDIDATE,
        payload: candidate
    };
    
    return action;  
}

export const clearCandidate = (candidate: number) => {
    const action: ActionTypes = {
        type: CLEAR_CANDIDATE,
        payload: candidate
    };
    
    return action;  
}

