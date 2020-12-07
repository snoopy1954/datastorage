import { SET_PDFURL, CLEAR_PDFURL, ActionTypes } from './types';

export const setPdfUrl = (pdfUrl: string) => {
    const action: ActionTypes = {
        type: SET_PDFURL,
        payload: pdfUrl
    };
    
    return action;  
}

export const clearPdfUrl = () => {
    const action: ActionTypes = {
        type: CLEAR_PDFURL
    };
    
    return action;  
}

