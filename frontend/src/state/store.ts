import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pageReducer } from './page/reducers';
import { yearlistReducer } from './pressure/yearlist/reducers';
import { selectedyearReducer } from './pressure/selectedyear/reducers';
import { monthlistReducer } from './pressure/monthlist/reducers';
import { selectedmonthReducer } from './pressure/selectedmonth/reducers';
import { selecteddayReducer } from './pressure/selectedday/reducers';
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
import { imageReducer } from './image/reducers';
import { booklistReducer } from './book/booklist/reducers';
import { selectedbookReducer } from './book/selectedbook/reducers';
import { changedbooklistReducer } from './book/changedbooklist/reducers';
import { addressgrouplistReducer } from './address/addressgrouplist/reducers';
import { selectedaddressgroupReducer } from './address/selectedaddressgroup/reducers';
import { addresslistReducer } from './address/addresslist/reducers';
import { selectedaddressReducer } from './address/selectedaddress/reducers';
import { addressgroupfilterReducer } from './address/addressgroupfilter/reducers';
import { changedaddresslistReducer } from './address/changedaddresslist/reducers';
import { sortbuttonReducer } from './address/sortbutton/reducers';
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
import { invoicingpartylistReducer } from './axa/invoicingpartylist/reducers';
import { selectedinvoicingpartyReducer } from './axa/selectedinvoicingparty/reducers';
import { accountlistReducer } from './axa/accountlist/reducers';
import { selectedaccountReducer } from './axa/selectedaccount/reducers';
import { openaccountReducer } from './axa/openaccount/reducers';
import { billlistReducer } from './axa/billlist/reducers';
import { selectedbillReducer } from './axa/selectedbill/reducers';
import { selectedbillsReducer } from './axa/selectedbills/reducers';
import { pdfurlReducer } from './axa/pdfUrl/reducers';


const rootReducer = combineReducers({
    page: pageReducer,
    yearlist: yearlistReducer,
    selectedyear: selectedyearReducer,
    monthlist: monthlistReducer,
    selectedmonth: selectedmonthReducer,
    selectedday: selecteddayReducer,
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
    image : imageReducer,
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
    invoicingparties: invoicingpartylistReducer,
    invoicingparty: selectedinvoicingpartyReducer,
    accounts: accountlistReducer,
    account: selectedaccountReducer,
    openaccount: openaccountReducer,
    bills: billlistReducer,
    bill: selectedbillReducer,
    selectedbills: selectedbillsReducer,
    pdfurl: pdfurlReducer,
});

export type RootState = ReturnType<typeof rootReducer>; 

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store