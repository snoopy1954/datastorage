import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pageReducer } from './page/reducers';
import { imageReducer } from './image/reducers';
import { binarydataReducer } from './binarydata/reducers';
import { pdfurlReducer } from './axa/pdfUrl/reducers';

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

import { tonguelistReducer } from './book/tonguelist/reducers';
import { selectedtongueReducer } from './book/selectedtongue/reducers';
import { formatlistReducer } from './book/formatlist/reducers';
import { selectedformatReducer } from './book/selectedformat/reducers';
import { ownershiplistReducer } from './book/ownershiplist/reducers';
import { selectedownershipReducer } from './book/selectedownership/reducers';
import { bookgrouplistReducer } from './book/bookgrouplist/reducers';
import { selectedbookgroupReducer } from './book/selectedbookgroup/reducers';
import { subgroupsReducer } from './book/selectedsubgroups/reducers';
import { filterReducer } from './book/filter/reducers';
import { booklistReducer } from './book/booklist/reducers';
import { selectedbookReducer } from './book/selectedbook/reducers';
import { changedbooklistReducer } from './book/changedbooklist/reducers';
import { sortbuttonReducer } from './book/sortbutton/reducers';

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
import { infosReducer } from './info/infos/reducers';

import { accounttypesReducer } from './account/accounttypes/reducers';
import { accounttypeReducer } from './account/accounttype/reducers';
import { accountyearsReducer } from './account/accountyears/reducers';
import { accountyearReducer } from './account/accountyear/reducers';
import { transactionsReducer } from './account/transactions/reducers';
import { transactionReducer } from './account/transaction/reducers';
import { accountfilterReducer } from './account/accountfilter/reducers';

import { recipegroupsReducer } from './recipe/recipegroups/reducers';
import { recipegroupReducer } from './recipe/recipegroup/reducers';
import { recipesReducer } from './recipe/recipes/reducers';
import { recipeReducer } from './recipe/recipe/reducers';
import { recipefilterReducer } from './recipe/recipefilter/reducers';
import { changedrecipesReducer } from './recipe/changedrecipes/reducers';

import { documentgroupsReducer } from './document/groups/reducers';
import { documentgroupReducer } from './document/group/reducers';
import { documentsReducer } from './document/documents/reducers';
import { documentReducer } from './document/document/reducers';
import { documentfilterReducer } from './document/filter/reducers';
import { changeddocumentsReducer } from './document/changed/reducers';

import { sportgroupsReducer } from './sport/groups/reducers';
import { sportgroupReducer } from './sport/group/reducers';
import { sportyearsReducer } from './sport/years/reducers';
import { sportyearReducer } from './sport/year/reducers';
import { activitiesReducer } from './sport/activities/reducers';
import { activityReducer } from './sport/activity/reducers';

import { musicgroupsReducer } from './music/groups/reducers';
import { musicgroupReducer } from './music/group/reducers';
import { artistsReducer } from './music/artists/reducers';
import { artistReducer } from './music/artist/reducers';
import { cdsReducer } from './music/cds/reducers';
import { cdReducer } from './music/cd/reducers';
import { artistfilterReducer } from './music/artistfilter/reducers';


const rootReducer = combineReducers({
    page: pageReducer,
    image : imageReducer,
    binarydata : binarydataReducer,
    pdfurl: pdfurlReducer,
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
    tongues: tonguelistReducer,
    tongue: selectedtongueReducer,
    formats: formatlistReducer,
    format: selectedformatReducer,
    ownerships: ownershiplistReducer,
    ownership: selectedownershipReducer,
    bookgroups: bookgrouplistReducer,
    bookgroup: selectedbookgroupReducer,
    subgroups: subgroupsReducer,
    filters: filterReducer,
    books: booklistReducer,
    book: selectedbookReducer,
    changedbooklist: changedbooklistReducer,
    addressgroups: addressgrouplistReducer,
    addressgroup: selectedaddressgroupReducer,
    addresses: addresslistReducer,
    address: selectedaddressReducer,
    addressgroupfilter: addressgroupfilterReducer,
    changedaddresslist: changedaddresslistReducer,
    sortbutton: sortbuttonReducer,
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
    infos: infosReducer,
    accounttypes: accounttypesReducer,
    accounttype: accounttypeReducer,
    accountyears: accountyearsReducer,
    accountyear: accountyearReducer,
    transactions: transactionsReducer,
    transaction: transactionReducer,
    accountfilter: accountfilterReducer,
    recipegroups: recipegroupsReducer,
    recipegroup: recipegroupReducer,
    recipes: recipesReducer,
    recipe: recipeReducer,
    recipefilter: recipefilterReducer,
    changedrecipes: changedrecipesReducer,
    documentgroups: documentgroupsReducer,
    documentgroup: documentgroupReducer,
    documents: documentsReducer,
    document: documentReducer,
    documentfilter: documentfilterReducer,
    changeddocuments: changeddocumentsReducer,
    sportgroups: sportgroupsReducer,
    sportgroup: sportgroupReducer,
    sportyears: sportyearsReducer,
    sportyear: sportyearReducer,
    activities: activitiesReducer,
    activity: activityReducer,
    musicgroups: musicgroupsReducer,
    musicgroup: musicgroupReducer,
    artists: artistsReducer,
    artist: artistReducer,
    cds: cdsReducer,
    cd: cdReducer,
    artistfilter: artistfilterReducer,
    
});

export type RootState = ReturnType<typeof rootReducer>; 

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store