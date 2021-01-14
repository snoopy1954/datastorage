import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAddressgroups } from '../../state/address/addressgrouplist/actions';
import { initializeAddresses } from '../../state/address/addresslist/actions';

import { AppHeaderH2 } from '../basic/header';
import { AddressPage } from './address/AddressPage';
import { AddressgroupPage } from './addressgroup/AddressgroupPage';


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
        dispatch(setPage({ mainpage, subpage: 'address' }));
    }, [mainpage, dispatch]);
   
    const actionSelect = (selected: string) => {
        dispatch(setPage({ mainpage, subpage: selected }));
    };
  

    return (
        <div className="App">
            <AppHeaderH2 text='Adressen' icon='address book'/>
            <Button style={styleButton} onClick={() => actionSelect('address')}>Kontakte</Button>
            <Button style={styleButton} onClick={() => actionSelect('addressgroup')}>Gruppen</Button>
            {subpage==='address'&&<AddressPage/>}
            {subpage==='addressgroup'&&<AddressgroupPage/>}
        </div>
    );
};
    
export default Address;
