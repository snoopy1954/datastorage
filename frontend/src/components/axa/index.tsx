import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Account } from '../../../../backend/src/types/axa';
import { AccountStatus } from '../../types/axa';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeInvoicingparties } from  '../../state/axa/invoicingpartylist/actions';
import { initializeAccounts } from  '../../state/axa/accountlist/actions';
import { initializeBills } from  '../../state/axa/billlist/actions';
import { setOpenAccount } from '../../state/axa/openaccount/actions';
import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";

import AccountPage from "./account/AccountListPage";
import BillPage from "./bill/BillListPage";
import InvoicingpartyPage from "./invoicingparty/InvoicingpartyListPage";


const Axa: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      
  const accounts: Account[] = useSelector((state: RootState) => state.accounts);      

  React.useEffect(() => {
    dispatch(initializeInvoicingparties());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeAccounts());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeBills());
  }, [dispatch]);

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
      name: 'invoicingparties',
      title: 'Kreditor',
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
      {subpage==='invoicingparties'&&<InvoicingpartyPage />}
    </div>
  );
}
    
export default Axa;
    