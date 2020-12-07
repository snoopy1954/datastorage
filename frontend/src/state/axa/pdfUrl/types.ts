export const SET_PDFURL = 'SET_PDFURL';
export const CLEAR_PDFURL = 'CLEAR_PDFURL';

interface SetPdfUrlAction {
    type: typeof SET_PDFURL;
    payload: string;
}

interface ClearPdfUrlAction {
    type: typeof CLEAR_PDFURL;
}

export type ActionTypes = SetPdfUrlAction | ClearPdfUrlAction;