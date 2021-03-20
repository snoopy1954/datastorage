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

import { selectedfieldReducer } from './sudoku/selectedfield/reducers';
import { gamefieldsReducer } from './sudoku/gamefields/reducers';
import { sudokulistReducer } from './sudoku/sudokulist/reducers';
import { flagsReducer } from './sudoku/flags/reducers';
import { solutionfieldsReducer } from './sudoku/solutionfields/reducers';
import { sequenceReducer } from './sudoku/sequence/reducers';
import { candidatesReducer } from './sudoku/candidates/reducers';
import { positionsReducer } from './sudoku/positions/reducers';
import { notificationReducer } from './sudoku/notification/reducers';

import { billerlistReducer } from './axa/billerlist/reducers';
import { changedbillerlistReducer } from './axa/changedbillerlist/reducers';
import { selectedbillerReducer } from './axa/selectedbiller/reducers';
import { accountlistReducer } from './axa/accountlist/reducers';
import { selectedaccountReducer } from './axa/selectedaccount/reducers';
import { openaccountReducer } from './axa/openaccount/reducers';
import { billlistReducer } from './axa/billlist/reducers';
import { selectedbillReducer } from './axa/selectedbill/reducers';
import { selectedbillsReducer } from './axa/selectedbills/reducers';
import { axayearsReducer } from './axa/years/reducers';
import { axayearReducer } from './axa/year/reducers';


const rootReducer = combineReducers({
    page: pageReducer,
    groups: groupsReducer,
    years: yearsReducer,
    formats: formatsReducer,

    books: booksReducer,
    ownerships: ownershipsReducer,
    tongues: tonguesReducer,
    
    accounttypes: accounttypesReducer,
    transactions: transactionsReducer,
    
    documents: documentsReducer,
    
    recipes: recipesReducer,
    
    activities: activitiesReducer,
    
    pressureyears: pressureyearsReducer,
    months: monthsReducer,
    
    devices: devicesReducer,
    devicetypes: devicetypesReducer,
    oss: ossReducer,
    
    addresses: addressesReducer,
    
    movies: moviesReducer,
    
    selectedfield: selectedfieldReducer,
    gamefields: gamefieldsReducer,
    sudokus: sudokulistReducer,
    flags: flagsReducer,
    solutionfields: solutionfieldsReducer,
    sequence: sequenceReducer,
    candidates: candidatesReducer, 
    positions: positionsReducer,
    notification: notificationReducer,
    
    billers: billerlistReducer,
    changedbillers: changedbillerlistReducer,
    biller: selectedbillerReducer,
    accounts: accountlistReducer,
    account: selectedaccountReducer,
    openaccount: openaccountReducer,
    bills: billlistReducer,
    bill: selectedbillReducer,
    selectedbills: selectedbillsReducer,
    axayears: axayearsReducer,
    axayear: axayearReducer,
    
    historylines: historylinesReducer,
    infos: infosReducer,
    
    artists: artistsReducer,
    artist: artistReducer,
    cds: cdsReducer,
    
});

export type RootState = ReturnType<typeof rootReducer>; 

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store