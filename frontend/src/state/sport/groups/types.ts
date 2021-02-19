import { Group } from '../../../../../backend/src/types/basic';

export const SET_SPORTGROUPS = 'SET_SPORTGROUPS';
export const ADD_SPORTGROUP  = 'ADD_SPORTGROUP';
export const UPDATE_SPORTGROUP = 'UPDATE_SPORTGROUP';
export const REMOVE_SPORTGROUP = 'REMOVE_SPORTGROUP';

interface SetSportgroupsAction {
    type: typeof SET_SPORTGROUPS;
    payload: Group[];
}

interface AddSportgroupAction {
    type: typeof ADD_SPORTGROUP;
    payload: Group;
}

interface UpdateSportgroupAction {
    type: typeof UPDATE_SPORTGROUP;
    payload: Group;
}

interface RemoveSportgroupAction {
    type: typeof REMOVE_SPORTGROUP;
    payload: string;
}

export type DispatchSetSportgroups = (arg: SetSportgroupsAction) => (SetSportgroupsAction);
export type DispatchAddSportgroup = (arg: AddSportgroupAction) => (AddSportgroupAction);
export type DispatchUpdateSportgroup = (arg: UpdateSportgroupAction) => (UpdateSportgroupAction);
export type DispatchRemoveSportgroup = (arg: RemoveSportgroupAction) => (RemoveSportgroupAction);
    
export type ActionTypes = SetSportgroupsAction | AddSportgroupAction | UpdateSportgroupAction | RemoveSportgroupAction;
    