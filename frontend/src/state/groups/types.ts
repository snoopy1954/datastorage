import { Group } from '../../../../backend/src/types/basic';

export const SET_GROUPS = 'SET_GROUPS';
export const ADD_GROUP  = 'ADD_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';
export const EXCHANGE_GROUPS = 'EXCHANGE_GROUPS';

interface SetGroupsAction {
    type: typeof SET_GROUPS;
    payload: Group[];
}

interface AddGroupAction {
    type: typeof ADD_GROUP;
    payload: Group;
}

interface UpdateGroupAction {
    type: typeof UPDATE_GROUP;
    payload: Group;
}

interface RemoveGroupAction {
    type: typeof REMOVE_GROUP;
    payload: string;
}

interface ExchangeGroupsAction {
    type: typeof EXCHANGE_GROUPS;
    payload: Group[];
}

export type ActionTypes = SetGroupsAction | AddGroupAction | UpdateGroupAction | RemoveGroupAction | ExchangeGroupsAction;
    