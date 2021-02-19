import { Activity, ActivityNoID } from '../../../../../backend/src/types/sport';
import { 
    SET_ACTIVITIES, 
    ADD_ACTIVITY,
    UPDATE_ACTIVITY,
    REMOVE_ACTIVITY,
    EXCHANGE_ACTIVITIES,
    DispatchSetActivities,
    DispatchAddActivity,
    DispatchUpdateActivity,
    DispatchRemoveActivity
} from './types';

import { create, update, remove, getAll } from "../../../services/sport/activities";


export const initializeActivities = () => {
  return async (dispatch: DispatchSetActivities) => {
    const activities = await getAll();
    dispatch({
      type: SET_ACTIVITIES,
      payload: activities,
    });
  }
};

export const addActivity = (activity: ActivityNoID) => {
  return async (dispatch: DispatchAddActivity) => {
    const newActivity = await create(activity);
    dispatch({
      type: ADD_ACTIVITY,
      payload: newActivity
    });
  }
};

export const updateActivity = (activity: Activity) => {
  return async (dispatch: DispatchUpdateActivity) => {
    const newActivity = await update(activity.id, activity);
    dispatch({
      type: UPDATE_ACTIVITY,
      payload: newActivity
    });
  }
};
  
export const removeActivity = (id: string) => {
  return async (dispatch: DispatchRemoveActivity) => {
    await remove(id);
    dispatch({
      type: REMOVE_ACTIVITY,
      payload: id
    });
  }
};

export const exchangeActivities = (activities: Activity[]) => {
  const action = 
    {
      type: EXCHANGE_ACTIVITIES,
      payload: activities,
    }
        
    return action;  
};

