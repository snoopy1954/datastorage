import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAccounttypes } from '../../state/account/accounttypes/actions';
import { initializeAccountyears } from '../../state/account/accountyears/actions';
import { initializeTransactions } from '../../state/account/transactions/actions';

import { AppHeaderH2 } from '../basic/header';
import { AccounttypePage } from './accounttype/AccounttypePage';
import { AccountyearPage } from './accountyear/AccountyearPage';
import { TransactionPage } from './transaction/TransactionPage';

const Account: React.FC = () => {  
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

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
    dispatch(setPage({ mainpage, subpage: 'transaction' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Konten' icon='book'/>
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