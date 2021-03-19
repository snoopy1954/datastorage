import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeAddresses } from '../../state/address/addresses/actions';
import { initializeGroups } from '../../state/basic/groups/actions';

import { AppHeaderH2 } from '../basic/header';
import { AddressPage } from './address/AddressPage';
import { GroupPage } from '../basic/group/GroupPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/address/group';


const Address: React.FC = () => {
    const dispatch = useDispatch();
  
    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const subpage = useSelector((state: RootState) => state.page.subpage);      
  
    React.useEffect(() => {
        const fetchGroups = async () => {
          const groups: Group[] = await getAllDB();
          dispatch(initializeGroups(groups));
        }
        fetchGroups();
      }, [dispatch]);
    
    React.useEffect(() => {
        dispatch(initializeAddresses());
    }, [dispatch]);
  
    React.useEffect(() => {
        dispatch(setPage({ mainpage, subpage: 'addresses' }));
    }, [mainpage, dispatch]);
   
    const actionSelect = (selected: string) => {
        dispatch(setPage({ mainpage, subpage: selected }));
    };
  
    return (
        <div className="App">
            <AppHeaderH2 text='Adressen' icon='address card'/>
            <Button style={styleButton} onClick={() => actionSelect('addresses')}>Kontakte</Button>
            <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppen</Button>
            {subpage==='addresses'&&<AddressPage/>}
            {subpage==='groups'&&<GroupPage title='Gruppen' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
        </div>
    );
};
    
export default Address;
