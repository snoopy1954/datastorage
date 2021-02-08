import { Group } from '../../../../../backend/src/types/basic';

export const SET_DOCUMENTGROUPS = 'SET_DOCUMENTGROUPS';
export const ADD_DOCUMENTGROUP  = 'ADD_DOCUMENTGROUP';
export const UPDATE_DOCUMENTGROUP = 'UPDATE_DOCUMENTGROUP';
export const REMOVE_DOCUMENTGROUP = 'REMOVE_DOCUMENTGROUP';
export const EXCHANGE_DOCUMENTGROUPS = 'EXCHANGE_DOCUMENTGROUPS';

interface SetDocumentgroupsAction {
    type: typeof SET_DOCUMENTGROUPS;
    payload: Group[];
}

interface AddDocumentgroupAction {
    type: typeof ADD_DOCUMENTGROUP;
    payload: Group;
}

interface UpdateDocumentgroupAction {
    type: typeof UPDATE_DOCUMENTGROUP;
    payload: Group;
}

interface RemoveDocumentgroupAction {
    type: typeof REMOVE_DOCUMENTGROUP;
    payload: string;
}

interface ExchangeDocumentgroupsAction {
    type: typeof EXCHANGE_DOCUMENTGROUPS;
    payload: Group[];
}

export type DispatchSetDocumentgroups = (arg: SetDocumentgroupsAction) => (SetDocumentgroupsAction);
export type DispatchAddDocumentgroup = (arg: AddDocumentgroupAction) => (AddDocumentgroupAction);
export type DispatchUpdateDocumentgroup = (arg: UpdateDocumentgroupAction) => (UpdateDocumentgroupAction);
export type DispatchRemoveDocumentgroup = (arg: RemoveDocumentgroupAction) => (RemoveDocumentgroupAction);
    
export type ActionTypes = SetDocumentgroupsAction | AddDocumentgroupAction | UpdateDocumentgroupAction | RemoveDocumentgroupAction | ExchangeDocumentgroupsAction;
    