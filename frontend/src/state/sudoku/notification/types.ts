export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

interface SetNotificationAction {
    type: typeof SET_NOTIFICATION;
    payload: string;
}

interface ClearNotificationAction {
    type: typeof CLEAR_NOTIFICATION;
}

export type DispatchSetNotification = (arg: SetNotificationAction) => (SetNotificationAction);

export type ActionTypes = SetNotificationAction | ClearNotificationAction;