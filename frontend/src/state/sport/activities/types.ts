import { Activity } from '../../../../../backend/src/types/sport';

export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const ADD_ACTIVITY  = 'ADD_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
export const EXCHANGE_ACTIVITIES = 'EXCHANGE_ACTIVITIES';

interface SetActivitiesAction {
    type: typeof SET_ACTIVITIES;
    payload: Activity[];
}

interface AddActivityAction {
    type: typeof ADD_ACTIVITY;
    payload: Activity;
}

interface UpdateActivityAction {
    type: typeof UPDATE_ACTIVITY;
    payload: Activity;
}

interface RemoveActivityAction {
    type: typeof REMOVE_ACTIVITY;
    payload: string;
}

interface ExchangeActivitiesAction {
    type: typeof EXCHANGE_ACTIVITIES;
    payload: Activity[];
}

export type DispatchSetActivities = (arg: SetActivitiesAction) => (SetActivitiesAction);
export type DispatchAddActivity = (arg: AddActivityAction) => (AddActivityAction);
export type DispatchUpdateActivity = (arg: UpdateActivityAction) => (UpdateActivityAction);
export type DispatchRemoveActivity = (arg: RemoveActivityAction) => (RemoveActivityAction);
    
export type ActionTypes = SetActivitiesAction | AddActivityAction | UpdateActivityAction | RemoveActivityAction | ExchangeActivitiesAction;
    