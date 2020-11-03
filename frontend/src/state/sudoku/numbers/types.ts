export const INITIALIZE_NUMBERS = 'INITIALIZE_NUMBERS';
export const SET_NUMBER = 'SET_NUMBER';
export const CLEAR_NUMBER= 'CLEAR_NUMBER';

interface InitializeNumbersAction {
    type: typeof INITIALIZE_NUMBERS;
}

interface SetNumberAction {
    type: typeof SET_NUMBER;
    payload: {
        index: number;
        value: number;
    };
}

interface ClearNumberAction {
    type: typeof CLEAR_NUMBER;
    payload: number;
}

export type ActionTypes = InitializeNumbersAction | SetNumberAction | ClearNumberAction;