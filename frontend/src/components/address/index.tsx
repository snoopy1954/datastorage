import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAddressgroups } from '../../state/address/addressgrouplist/actions';
import { initializeAddresses } from '../../state/address/addresslist/actions';

import { AppHeaderH2 } from '../basic/header';
import { AppMenu, Item } from '../basic/menu';
import { AddressListPage } from './address/AddressListPage';
import { AddressgroupListPage } from './addressgroup/AddressgroupListPage';

import { backgroundColor, styleMainMenu } from '../../constants';


const Address: React.FC = () => {
    const dispatch = useDispatch();
  
    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const subpage = useSelector((state: RootState) => state.page.subpage);      
  
    React.useEffect(() => {
      dispatch(initializeAddressgroups());
    }, [dispatch]);

    React.useEffect(() => {
      dispatch(initializeAddresses());
    }, [dispatch]);
  
    React.useEffect(() => {
      dispatch(setPage({ mainpage, subpage: 'addresses' }));
    }, [mainpage, dispatch]);
   
    const handleSelection = (selected: string) => {
      dispatch(setPage({ mainpage, subpage: selected }));
    };
  
    const buttons: Item[] = 
    [
      {
        name: 'addresses',
        title: 'Adressen',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'addressgroup',
        title: 'Gruppe',
        color: 'blue',
        onClick: handleSelection
      },
    ];
  

  return (
    <div className="App">
      <AppHeaderH2 text='Adressen' icon='address book'/>
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      {subpage==='addresses'&&<AddressListPage/>}
      {subpage==='addressgroup'&&<AddressgroupListPage/>}
    </div>
  );
}
    
export default Address;
