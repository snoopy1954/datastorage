import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { mainpageReducer } from './mainpage/reducers';
import { yearlistReducer } from './pressure/yearlist/reducers';
import { selectedyearReducer } from './pressure/selectedyear/reducers';
import { monthlistReducer } from './pressure/monthlist/reducers';
import { selectedmonthReducer } from './pressure/selectedmonth/reducers';
import { selecteddayReducer } from './pressure/selectedday/reducers';

const rootReducer = combineReducers({
    mainpage: mainpageReducer,
    yearlist: yearlistReducer,
    selectedyear: selectedyearReducer,
    monthlist: monthlistReducer,
    selectedmonth: selectedmonthReducer,
    selectedday: selecteddayReducer,
});

export type RootState = ReturnType<typeof rootReducer>; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store: any = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
console.log('store = ', store.getState());

export default store