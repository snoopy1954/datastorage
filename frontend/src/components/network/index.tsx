import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeDevices } from  '../../state/network/devices/actions';
import { initializeDevicetypes } from  '../../state/network/devicetypes/actions';
import { initializeOss } from  '../../state/network/oss/actions';

import { AppHeaderH2 } from '../basic/header';
import { DevicePage } from "./device/DevicePage";
import { DevicetypePage } from './devicetype/DevicetypePage';
import { OsPage } from './os/OsPage';


const Network: React.FC = () => {
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const subpage = useSelector((state: RootState) => state.page.subpage);      

    React.useEffect(() => {
      dispatch(initializeDevices());
    }, [dispatch]);

    React.useEffect(() => {
      dispatch(initializeDevicetypes());
    }, [dispatch]);

    React.useEffect(() => {
      dispatch(initializeOss());
    }, [dispatch]);

    React.useEffect(() => {
      dispatch(setPage({ mainpage, subpage: 'devices' }));
    }, [mainpage, dispatch]);

    const actionSelect = (selected: string) => {
      dispatch(setPage({ mainpage, subpage: selected }));
    };

    return (
      <div className="App">
        <AppHeaderH2 text='Netzwerk' icon='sitemap'/>
        <Button style={styleButton} onClick={() => actionSelect('devices')}>Geräte</Button>
        <Button style={styleButton} onClick={() => actionSelect('devictypes')}>Typen</Button>
        <Button style={styleButton} onClick={() => actionSelect('oss')}>Os</Button>
        {subpage==='devices'&&<DevicePage />}
        {subpage==='devictypes'&&<DevicetypePage />}
        {subpage==='oss'&&<OsPage />}
      </div>
    );
};
    
export default Network;
    