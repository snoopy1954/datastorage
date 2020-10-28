import { SelectedVersions } from '../../../../../backend/src/types/network';
import { SET_VERSIONS, CLEAR_VERSIONS, ActionTypes } from './types';

export const setSelectedVersions = (id: number, versions: string[]) => {
    const selectedVersions: SelectedVersions = {
        id,
        versions
    }
    const action: ActionTypes = {
        type: SET_VERSIONS,
        payload: selectedVersions
    };
    
    return action;  
}

export const clearSelectedVersions = () => {
    const action: ActionTypes = {
        type: CLEAR_VERSIONS
    };
    
    return action;  
}

