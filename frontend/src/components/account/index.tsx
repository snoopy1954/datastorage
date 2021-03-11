import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Accountyear } from '../../../../backend/src/types/account';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAccounttypes } from '../../state/account/accounttypes/actions';
import { initializeAccountyears } from '../../state/account/accountyears/actions';
import { initializeTransactions } from '../../state/account/transactions/actions';
import { setSelectedAccountyear } from '../../state/account/accountyear/actions';
import { setAccountfilter } from '../../state/account/accountfilter/actions';

import { AppHeaderH2 } from '../basic/header';
import { AccounttypePage } from './accounttype/AccounttypePage';
import { AccountyearPage } from './accountyear/AccountyearPage';
import { TransactionPage } from './transaction/TransactionPage';

import { getCurrentYear } from '../../utils/basic/basic';
import { getAccountyear } from '../../utils/account/accountyear';


const Account: React.FC = () => {  
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      
  const years = useSelector((state: RootState) => state.accountyears);      

  React.useEffect(() => {
    dispatch(initializeAccounttypes());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeAccountyears());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeTransactions());
  }, [dispatch]);

  React.useEffect(() => {
    if (years.length!==0) {
      const currentYearName: number = +(getCurrentYear());
      const currentYear: Accountyear = getAccountyear(years, String(currentYearName));
      if (currentYear.id!=='') {
        dispatch(setSelectedAccountyear(currentYear));
        dispatch(setAccountfilter({
          accountype: 'Diba Giro',
          accountyear: currentYear.name,
          person: ''
        }));
      }
    }
  }, [dispatch, years]);

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
      <Button style={styleButton} onClick={() => actionSelect('accountyear')}>Jahr</Button>
      {subpage==='transaction'&&<TransactionPage/>}
      {subpage==='accounttype'&&<AccounttypePage/>}
      {subpage==='accountyear'&&<AccountyearPage/>}
    </div>
  );
}
    
export default Account;