import React from 'react';

import { useStateValue, setDevicetypeList, setOsList, setDeviceList, setPage } from "../../state";
import { getAll as getAllDevices } from "../../services/device/devices";
import { getAll as getAllOss } from "../../services/device/oss";
import { getAll as getAllDevicetypes } from "../../services/device/devicetypes";
import { sortDeviceList, sortOsList } from "../../utils/network";
import DeviceListPage from "./device/DeviceListPage";
import DevicetypeListPage from "./devicetype/DevicetypeListPage";
import OsListPage from "./os/OsListPage";
import { AppHeaderH2 } from "../basic/header";
import AppMenu from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";
import { Item } from "../basic/menu";


const Network: React.FC = () => {
    const [{ page }, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchDeviceList = async () => {
          const deviceListFromApi = sortDeviceList(await getAllDevices());
          dispatch(setDeviceList(deviceListFromApi));
        };
        fetchDeviceList();
    
        const fetchDevicetypeList = async () => {
          const devicetypeListFromApi = await getAllDevicetypes();
          dispatch(setDevicetypeList(devicetypeListFromApi));
        };
        fetchDevicetypeList();
    
        const fetchOsList = async () => {
          const osListFromApi = sortOsList(await getAllOss());
          dispatch(setOsList(osListFromApi));
        };
        fetchOsList();
    
        dispatch(setPage('devices'));
    }, [dispatch]);

    const handleSelection = (selected: string) => {
        dispatch(setPage(selected));
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
        {page==='devices'&&<DeviceListPage />}
        {page==='devictypes'&&<DevicetypeListPage />}
        {page==='oss'&&<OsListPage />}
      </div>
    );
}
    
export default Network;
    