import { Transaction } from '../../../../../backend/src/types/account';
import { SET_SELECTED_TRANSACTION, CLEAR_SELECTED_TRANSACTION, ActionTypes } from './types';

import { emptyTransaction } from '../../../utils/account/transaction';

const initialState: Transaction = emptyTransaction();

export const transactionReducer = (state = initialState, action: ActionTypes): Transaction => {
    switch (action.type) {
        case SET_SELECTED_TRANSACTION:
            return (
                action.payload
            );
        case CLEAR_SELECTED_TRANSACTION:
            return (
                initialState
            );
        default:
            return state
    }
};