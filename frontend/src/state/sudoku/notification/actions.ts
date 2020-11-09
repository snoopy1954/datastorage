import { SET_NOTIFICATION, CLEAR_NOTIFICATION, ActionTypes, DispatchSetNotification } from './types';

export const setNotification = (message: string) => {
    const action: ActionTypes = {
        type: SET_NOTIFICATION,
        payload: message
    };
    
    return action;  
}

export const clearNotification = () => {
    const action: ActionTypes = {
        type: CLEAR_NOTIFICATION
    };
    
    return action;  
}

export const showNotification = (message: string, seconds: number) => {
    return (dispatchSetNotification: DispatchSetNotification) => {
        dispatchSetNotification(setNotification(message));
        setTimeout(() => {
            dispatchSetNotification(setNotification(''))
        }, seconds * 1000);
    }
}

