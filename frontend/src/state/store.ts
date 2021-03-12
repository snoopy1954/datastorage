import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pageReducer } from './page/reducers';
import { groupsReducer } from './groups/reducers';

import { yearlistReducer } from './pressure/yearlist/reducers';
import { selectedyearReducer } from './pressure/selectedyear/reducers';
import { openedyearReducer } from './pressure/openedyear/reducers';
import { monthlistReducer } from './pressure/monthlist/reducers';
import { selectedmonthReducer } from './pressure/selectedmonth/reducers';

import { devicetypelistReducer } from './network/devicetypelist/reducers';
import { selecteddevicetypeReducer } from './network/selecteddevicetype/reducers';
import { oslistReducer } from './network/oslist/reducers';
import { selectedosReducer } from './network/selectedos/reducers';
import { versionsReducer } from './network/selectedversions/reducers';
import { devicelistReducer } from './network/devicelist/reducers';
import { selecteddeviceReducer } from './network/selecteddevice/reducers';

import { booksReducer } from './book/books/reducers';
import { bookReducer } from './book/book/reducers';
import { tonguesReducer } from './book/tongues/reducers';
import { formatsReducer } from './book/formats/reducers';
import { ownershipsReducer } from './book/ownerships/reducers';

import { addressgrouplistReducer } from './address/addressgrouplist/reducers';
import { selectedaddressgroupReducer } from './address/selectedaddressgroup/reducers';
import { addresslistReducer } from './address/addresslist/reducers';
import { selectedaddressReducer } from './address/selectedaddress/reducers';
import { addressgroupfilterReducer } from './address/addressgroupfilter/reducers';
import { changedaddresslistReducer } from './address/changedaddresslist/reducers';

import { movielistReducer } from './movie/movielist/reducers';
import { selectedmovieReducer } from './movie/selectedmovie/reducers';
import { moviegrouplistReducer } from './movie/moviegrouplist/reducers';
import { selectedmoviegroupReducer } from './movie/selectedmoviegroup/reducers';
import { moviesubgroupsReducer } from './movie/selectedmoviesubgroups/reducers';
import { movieformatlistReducer } from './movie/movieformatlist/reducers';
import { selectedmovieformatReducer } from './movie/selectedmovieformat/reducers';
import { moviefilterReducer } from './movie/moviefilter/reducers';
import { changedmovielistReducer } from './movie/changedmovielist/reducers';

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

import { historylinesReducer } from './info/historylines/reducers';
import { historylineReducer } from './info/historyline/reducers';
import { infosReducer } from './info/infos/reducers';

import { accounttypesReducer } from './account/accounttypes/reducers';
import { accounttypeReducer } from './account/accounttype/reducers';
import { accountyearsReducer } from './account/accountyears/reducers';
import { accountyearReducer } from './account/accountyear/reducers';
import { transactionsReducer } from './account/transactions/reducers';
import { transactionReducer } from './account/transaction/reducers';
import { accountfilterReducer } from './account/accountfilter/reducers';

import { recipesReducer } from './recipe/recipes/reducers';
import { recipeReducer } from './recipe/recipe/reducers';

import { documentsReducer } from './document/documents/reducers';
import { documentReducer } from './document/document/reducers';

import { activitiesReducer } from './sport/activities/reducers';
import { activityReducer } from './sport/activity/reducers';
import { sportyearsReducer } from './sport/years/reducers';
import { sportyearReducer } from './sport/year/reducers';

import { musicgroupsReducer } from './music/groups/reducers';
import { musicgroupReducer } from './music/group/reducers';
import { artistsReducer } from './music/artists/reducers';
import { artistReducer } from './music/artist/reducers';
import { cdsReducer } from './music/cds/reducers';
import { cdReducer } from './music/cd/reducers';


const rootReducer = combineReducers({
    page: pageReducer,
    groups: groupsReducer,

    yearlist: yearlistReducer,
    selectedyear: selectedyearReducer,
    openedyear: openedyearReducer,
    monthlist: monthlistReducer,
    selectedmonth: selectedmonthReducer,
    
    devicetypes: devicetypelistReducer,
    devicetype: selecteddevicetypeReducer,
    oss: oslistReducer,
    selectedos: selectedosReducer,
    versions: versionsReducer,
    devices: devicelistReducer,
    device: selecteddeviceReducer,
    
    books: booksReducer,
    book: bookReducer,
    formats: formatsReducer,
    ownerships: ownershipsReducer,
    tongues: tonguesReducer,
    
    addressgroups: addressgrouplistReducer,
    addressgroup: selectedaddressgroupReducer,
    addresses: addresslistReducer,
    address: selectedaddressReducer,
    addressgroupfilter: addressgroupfilterReducer,
    changedaddresslist: changedaddresslistReducer,
    
    movies: movielistReducer,
    movie: selectedmovieReducer,
    moviegroups: moviegrouplistReducer,
    moviegroup: selectedmoviegroupReducer,
    moviesubgroups: moviesubgroupsReducer,
    movieformats: movieformatlistReducer,
    movieformat: selectedmovieformatReducer,
    moviefilter: moviefilterReducer,
    changedmovies: changedmovielistReducer,
    
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
    historyline: historylineReducer,
    infos: infosReducer,
    
    accounttypes: accounttypesReducer,
    accounttype: accounttypeReducer,
    accountyears: accountyearsReducer,
    accountyear: accountyearReducer,
    transactions: transactionsReducer,
    transaction: transactionReducer,
    accountfilter: accountfilterReducer,
    
    recipes: recipesReducer,
    recipe: recipeReducer,
    
    documents: documentsReducer,
    document: documentReducer,
    
    activities: activitiesReducer,
    activity: activityReducer,
    sportyears: sportyearsReducer,
    sportyear: sportyearReducer,
    
    musicgroups: musicgroupsReducer,
    musicgroup: musicgroupReducer,
    artists: artistsReducer,
    artist: artistReducer,
    cds: cdsReducer,
    cd: cdReducer,
    
});

export type RootState = ReturnType<typeof rootReducer>; 

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store