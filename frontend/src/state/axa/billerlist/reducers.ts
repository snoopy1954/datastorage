import { Biller } from '../../../../../backend/src/types/axa';
import { SET_BILLER_LIST, ADD_BILLER, UPDATE_BILLER, REMOVE_BILLER, EXCHANGE_BILLERS, BillerAction } from './types';

const initialState: Biller[] = [];

export const billerlistReducer = (state = initialState, action: BillerAction): Biller[] => {
    switch (action.type) {
        case SET_BILLER_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, biller) => ({ ...memo, [biller.id]: biller }),
                    {}
                ),
            }
        case ADD_BILLER:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_BILLER:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_BILLER: 
            return {
                ...state.filter(item => item.id !== action.payload)
            }
        case EXCHANGE_BILLERS: {
            console.log(action.payload)
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        }
        default:
            return state
    }
}

