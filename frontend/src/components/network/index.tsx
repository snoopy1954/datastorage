import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeDevices } from  '../../state/network/devicelist/actions';
import { initializeDevicetypes } from  '../../state/network/devicetypelist/actions';
import { initializeOss } from  '../../state/network/oslist/actions';

import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";

import { backgroundColor, styleMainMenu } from "../../constants";

import DeviceListPage from "./device/DeviceListPage";
import DevicetypeListPage from "./devicetype/DevicetypeListPage";
import OsListPage from "./os/OsListPage";


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

    const handleSelection = (selected: string) => {
      dispatch(setPage({ mainpage, subpage: selected }));
    };

    const buttons: Item[] = 
    [
      {
        name: 'devices',
        title: 'Geräte',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'devictypes',
        title: 'Typen',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'oss',
        title: 'Os',
        color: 'blue',
        onClick: handleSelection
      },
    ];
    
    return (
      <div className="App">
        <AppHeaderH2 text='Netzwerk' icon='sitemap'/>
        <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
        {subpage==='devices'&&<DeviceListPage />}
        {subpage==='devictypes'&&<DevicetypeListPage />}
        {subpage==='oss'&&<OsListPage />}
      </div>
    );
}
    
export default Network;
    