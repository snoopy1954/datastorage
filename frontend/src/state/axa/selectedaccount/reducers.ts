import { Account, AccountNoID } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_ACCOUNT, CLEAR_SELECTED_ACCOUNT, ActionTypes } from './types';
import { emptyAccount } from '../../../utils/axa/account';

const account: AccountNoID = emptyAccount();
const initialState: Account = {
    id: '',
    ...account
};

export const selectedaccountReducer = (state = initialState, action: ActionTypes): Account => {
    switch (action.type) {
        case SET_SELECTED_ACCOUNT:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_ACCOUNT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};