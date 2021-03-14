import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Year } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAccounttypes } from '../../state/account/accounttypes/actions';
import { initializeYears } from '../../state/basic/years/actions';
import { initializeTransactions } from '../../state/account/transactions/actions';

import { AppHeaderH2 } from '../basic/header';
import { AccounttypePage } from './accounttype/AccounttypePage';
import { YearPage } from '../basic/year/YearPage';
import { TransactionPage } from './transaction/TransactionPage';

import { getAllYearDB, createYearDB, updateYearDB, removeYearDB } from '../../utils/account/year';


const Account: React.FC = () => {  
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    dispatch(initializeAccounttypes());
  }, [dispatch]);

  React.useEffect(() => {
    const fetchYears = async () => {
      const years: Year[] = await getAllYearDB();
      dispatch(initializeYears(years));
    }
    fetchYears();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeTransactions());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'transaction' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Konten' icon='money'/>
      <Button style={styleButton} onClick={() => actionSelect('transaction')}>Buchungen</Button>
      <Button style={styleButton} onClick={() => actionSelect('accounttype')}>Kontotyp</Button>
      <Button style={styleButton} onClick={() => actionSelect('years')}>Jahr</Button>
      {subpage==='transaction'&&<TransactionPage/>}
      {subpage==='accounttype'&&<AccounttypePage/>}
      {subpage==='years'&&<YearPage title='Jahre' createYearDB={createYearDB} updateYearDB={updateYearDB} removeYearDB={removeYearDB}/>}
    </div>
  );
}
    
export default Account;