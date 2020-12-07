import { Account, AccountNoID } from '../../../../../backend/src/types/axa';
import { SET_OPEN_ACCOUNT, CLEAR_OPEN_ACCOUNT, ActionTypes } from './types';
import { newAccount } from '../../../utils/axa';

const account: AccountNoID = newAccount();
const initialState: Account = {
    id: '',
    ...account
};

export const openaccountReducer = (state = initialState, action: ActionTypes): Account => {
    switch (action.type) {
        case SET_OPEN_ACCOUNT:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_OPEN_ACCOUNT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};