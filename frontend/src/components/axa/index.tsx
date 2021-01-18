import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { Account, Year } from '../../../../backend/src/types/axa';
import { AccountStatus } from '../../types/axa';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAccounts } from  '../../state/axa/accountlist/actions';
import { initializeBillers } from  '../../state/axa/billerlist/actions';
import { initializeBills } from  '../../state/axa/billlist/actions';
import { initializeYears } from  '../../state/axa/years/actions';
import { setOpenAccount, clearOpenAccount } from '../../state/axa/openaccount/actions';
import { setSelectedYear } from '../../state/axa/year/actions';
import { clearImage } from '../../state/image/actions';
import { clearPdfUrl } from '../../state/axa/pdfUrl/actions';

import { AppHeaderH2 } from '../basic/header';
import { AccountPage } from './account/AccountPage';
import { BillPage } from './bill/BillPage';
import { BillerPage } from './biller/BillerPage';
import { YearPage } from './year/YearPage';


const Axa: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);
  const accounts: Account[] = useSelector((state: RootState) => state.accounts); 
  const years: Year[] = useSelector((state: RootState) => state.axayears);

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
    const actYear = String(new Date().getFullYear());
    Object.values(years).forEach(year => {
      if (actYear===year.name.name) {
        dispatch(setSelectedYear(year));
      }
    })
  }, [dispatch, years]);

  React.useEffect(() => {
    dispatch(clearOpenAccount());
    Object.values(accounts).forEach(account => {
      if(account.status===AccountStatus.OPEN) {
        dispatch(setOpenAccount(account));
      }
    })
  }, [accounts, dispatch]);

  React.useEffect(() => {
    dispatch(clearPdfUrl())
    dispatch(clearImage());
  }, [mainpage, dispatch]);

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
    