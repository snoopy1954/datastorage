import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAccounts } from  '../../state/axa/accounts/actions';
import { initializeBillers } from  '../../state/axa/billers/actions';
import { initializeBills } from  '../../state/axa/bills/actions';
import { initializeYears } from  '../../state/axa/years/actions';

import { AppHeaderH2 } from '../basic/header';
import { AccountPage } from './account/AccountPage';
import { BillPage } from './bill/BillPage';
import { BillerPage } from './biller/BillerPage';
import { YearPage } from './year/YearPage';


const Axa: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);

  React.useEffect(() => {
    dispatch(initializeBillers());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeYears());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeAccounts());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeBills());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  return (
    <div className="App">
      <AppHeaderH2 text='AXA' icon='ambulance'/>
      <Button style={styleButton} onClick={() => actionSelect('accounts')}>Abrechnung</Button>
      <Button style={styleButton} onClick={() => actionSelect('bills')}>Rechnung</Button>
      <Button style={styleButton} onClick={() => actionSelect('billers')}>Kreditor</Button>
      <Button style={styleButton} onClick={() => actionSelect('years')}>Jahr</Button>
      {subpage==='accounts'&&<AccountPage />}
      {subpage==='bills'&&<BillPage />}
      {subpage==='billers'&&<BillerPage />}
      {subpage==='years'&&<YearPage />}
    </div>
  );
}
    
export default Axa;
    