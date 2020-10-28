import { Bookgroup } from '../../../../../backend/src/types/book';

export const SET_BOOKGROUP_LIST = 'SET_BOOKGROUP_LIST';
export const ADD_BOOKGROUP  = 'ADD_BOOKGROUP';
export const UPDATE_BOOKGROUP = 'UPDATE_BOOKGROUP';
export const REMOVE_BOOKGROUP = 'REMOVE_BOOKGROUP';

interface SetBookgroupListAction {
    type: typeof SET_BOOKGROUP_LIST;
    payload: Bookgroup[];
}

interface AddBookgroupAction {
    type: typeof ADD_BOOKGROUP;
    payload: Bookgroup;
}

interface UpdateBookgroupAction {
    type: typeof UPDATE_BOOKGROUP;
    payload: Bookgroup;
}

interface RemoveBookgroupAction {
    type: typeof REMOVE_BOOKGROUP;
    payload: string;
}

export type DispatchSetBookgroupList = (arg: SetBookgroupListAction) => (SetBookgroupListAction);
export type DispatchAddBookgroup = (arg: AddBookgroupAction) => (AddBookgroupAction);
export type DispatchUpdateBookgroup = (arg: UpdateBookgroupAction) => (UpdateBookgroupAction);
export type DispatchRemoveBookgroup = (arg: RemoveBookgroupAction) => (RemoveBookgroupAction);
    
export type ActionTypes = SetBookgroupListAction | AddBookgroupAction | UpdateBookgroupAction | RemoveBookgroupAction;
    