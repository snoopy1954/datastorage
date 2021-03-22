import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pageReducer } from './page/reducers';
import { groupsReducer } from './basic/groups/reducers';
import { yearsReducer } from './basic/years/reducers';
import { formatsReducer } from './basic/formats/reducers';
import { historylinesReducer } from './info/historylines/reducers';
import { infosReducer } from './info/infos/reducers';

import { transactionsReducer } from './account/transactions/reducers';
import { accounttypesReducer } from './account/accounttypes/reducers';

import { addressesReducer } from './address/addresses/reducers';

import { accountsReducer } from './axa/accounts/reducers';
import { billsReducer } from './axa/bills/reducers';
import { axayearsReducer } from './axa/years/reducers';
import { billersReducer } from './axa/billers/reducers';

import { booksReducer } from './book/books/reducers';
import { tonguesReducer } from './book/tongues/reducers';
import { ownershipsReducer } from './book/ownerships/reducers';

import { documentsReducer } from './document/documents/reducers';

import { recipesReducer } from './recipe/recipes/reducers';

import { devicesReducer } from './network/devices/reducers';
import { devicetypesReducer } from './network/devicetypes/reducers';
import { ossReducer } from './network/oss/reducers';

import { activitiesReducer } from './sport/activities/reducers';

import { monthsReducer } from './pressure/months/reducers';
import { yearsReducer as pressureyearsReducer } from './pressure/years/reducers';

import { moviesReducer } from './movie/movies/reducers';

import { artistsReducer } from './music/artists/reducers';
import { artistReducer } from './music/artist/reducers';
import { cdsReducer } from './music/cds/reducers';

import { sudokusReducer } from './sudoku/sudokus/reducers';
import { notificationReducer } from './sudoku/notification/reducers';


const rootReducer = combineReducers({
    page: pageReducer,
    groups: groupsReducer,
    years: yearsReducer,
    formats: formatsReducer,
    historylines: historylinesReducer,
    infos: infosReducer,
    
    accounttypes: accounttypesReducer,
    transactions: transactionsReducer,
    
    addresses: addressesReducer,
    
    accounts: accountsReducer,
    bills: billsReducer,
    axayears: axayearsReducer,
    billers: billersReducer,
    
    books: booksReducer,
    ownerships: ownershipsReducer,
    tongues: tonguesReducer,
    
    documents: documentsReducer,
    
    recipes: recipesReducer,
    
    activities: activitiesReducer,
    
    pressureyears: pressureyearsReducer,
    months: monthsReducer,
    
    devices: devicesReducer,
    devicetypes: devicetypesReducer,
    oss: ossReducer,
    
    movies: moviesReducer,
    
    artists: artistsReducer,
    artist: artistReducer,
    cds: cdsReducer,
    
    sudokus: sudokusReducer,
    notification: notificationReducer,
    
});

export type RootState = ReturnType<typeof rootReducer>; 

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store