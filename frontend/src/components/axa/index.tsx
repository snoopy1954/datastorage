import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Account, Year } from '../../../../backend/src/types/axa';
import { AccountStatus } from '../../types/axa';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAccounts } from  '../../state/axa/accountlist/actions';
import { initializeBillers } from  '../../state/axa/billerlist/actions';
import { initializeBills } from  '../../state/axa/billlist/actions';
import { initializeYears } from  '../../state/axa/years/actions';
import { setOpenAccount } from '../../state/axa/openaccount/actions';
import { setSelectedYear } from '../../state/axa/year/actions';
import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";

import AccountPage from './account/AccountListPage';
import BillPage from './bill/BillListPage';
import BillerPage from './biller/BillerListPage';
import { YearPage } from './year/YearListPage';

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
    Object.values(accounts).forEach(account => {
      if(account.status===AccountStatus.OPEN) {
        dispatch(setOpenAccount(account));
      }
    })
  }, [accounts, dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'accounts' }));
  }, [mainpage, dispatch]);
 
  const handleSelection = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  const buttons: Item[] = 
  [
    {
      name: 'accounts',
      title: 'Abrechnung',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'bills',
      title: 'Rechnung',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'billers',
      title: 'Kreditor',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'years',
      title: 'Jahr',
      color: 'blue',
      onClick: handleSelection
    },
  ];

  return (
    <div className="App">
      <AppHeaderH2 text='AXA' icon='ambulance'/>
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      {subpage==='accounts'&&<AccountPage />}
      {subpage==='bills'&&<BillPage />}
      {subpage==='billers'&&<BillerPage />}
      {subpage==='years'&&<YearPage />}
    </div>
  );
}
    
export default Axa;
    