import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Device, DeviceNoID, Os } from '../../../../../../backend/src/types/network';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { clearSelectedOs } from  '../../../../state/network/selectedos/actions';
import { addDevice } from  '../../../../state/network/devicelist/actions'; 
import { setSelectedDevice} from  '../../../../state/network/selecteddevice/actions';
import { clearSelectedVersions, setSelectedVersions } from  '../../../../state/network/selectedversions/actions'; 

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddDeviceModal from "../AddDeviceModal";
import DeviceDetailsPage from "../DeviceDetailsPage";


const DeviceListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const devices = useSelector((state: RootState) => state.devices);
  const device = useSelector((state: RootState) => state.device);
  const oss = useSelector((state: RootState) => state.oss);

  React.useEffect(() => {
    dispatch(clearSelectedOs());
  }, [dispatch]);  

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewDevice = (values: DeviceNoID) => {
    dispatch(addDevice(values));
    closeModal();
  };

  const handleSelection = (device: Device) => {
    dispatch(setSelectedDevice(device))
    dispatch(clearSelectedVersions());
    device.osversions.forEach((osversion, index) => {
      const selectedOs: Os[] = Object.values(oss).filter((os => os.name === osversion.name));
      const selectedversions: string[] = selectedOs.length===0 ? [] : selectedOs[0].versions;
      dispatch(setSelectedVersions(index, selectedversions));
    });    
  }

  if (device.id!=='') {
    return (
      <DeviceDetailsPage/>
    )
  }

  const buttons: Item[] = 
  [
    {
      name: 'Neu',
      title: 'Neu',
      color: 'blue',
      onClick: openModal
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text='Geräteliste' icon='list'/>
      <AddDeviceModal
        edittype={Edittype.ADD}
        modalOpen={modalOpen}
        onSubmit={submitNewDevice}
        error={error}
        onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }}>Name</Table.HeaderCell>
            <Table.HeaderCell>Beschreibung</Table.HeaderCell>
            <Table.HeaderCell>Kommentar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(devices).map((device: Device) => (
            <Table.Row key={device.id} onClick={() => handleSelection(device)}>
              <Table.Cell>{device.name}</Table.Cell>
              <Table.Cell>{device.description}</Table.Cell>
              <Table.Cell>{device.comment}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DeviceListPage;