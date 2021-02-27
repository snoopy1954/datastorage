import { Group } from '../../../../../backend/src/types/basic';

export const SET_MUSICGROUPS = 'SET_MUSICGROUPS';
export const ADD_MUSICGROUP  = 'ADD_MUSICGROUP';
export const UPDATE_MUSICGROUP = 'UPDATE_MUSICGROUP';
export const REMOVE_MUSICGROUP = 'REMOVE_MUSICGROUP';

interface SetMusicgroupsAction {
    type: typeof SET_MUSICGROUPS;
    payload: Group[];
}

interface AddMusicgroupAction {
    type: typeof ADD_MUSICGROUP;
    payload: Group;
}

interface UpdateMusicgroupAction {
    type: typeof UPDATE_MUSICGROUP;
    payload: Group;
}

interface RemoveMusicgroupAction {
    type: typeof REMOVE_MUSICGROUP;
    payload: string;
}

export type DispatchSetMusicgroups = (arg: SetMusicgroupsAction) => (SetMusicgroupsAction);
export type DispatchAddMusicgroup = (arg: AddMusicgroupAction) => (AddMusicgroupAction);
export type DispatchUpdateMusicgroup = (arg: UpdateMusicgroupAction) => (UpdateMusicgroupAction);
export type DispatchRemoveMusicgroup = (arg: RemoveMusicgroupAction) => (RemoveMusicgroupAction);
    
export type ActionTypes = SetMusicgroupsAction | AddMusicgroupAction | UpdateMusicgroupAction | RemoveMusicgroupAction;
    