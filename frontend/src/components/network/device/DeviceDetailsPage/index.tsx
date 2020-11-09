import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Network, Osversion, Device, DeviceNoID } from '../../../../../../backend/src/types/network';
import { Edittype } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { updateDevice, removeDevice } from  '../../../../state/network/devicelist/actions'; 
import { clearSelectedDevice} from  '../../../../state/network/selecteddevice/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { AskModal } from "../../../basic/askModal";

import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddDeviceModal from "../AddDeviceModal";


const DeviceDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const device = useSelector((state: RootState) => state.device);

  const openModalChange = (): void => setModalOpen([true, false]);
  const openModalDelete = (): void => setModalOpen([false, true]);
  const closeModal = (): void => {
    setModalOpen([false, false]);
    setError(undefined);
  };

  const submitChangedDevice = async (values: DeviceNoID) => {
    if (device) {
      const newDevice: Device = {
        id: device.id,
        ...values
      };
      dispatch(updateDevice(newDevice));
    }
    closeModal();
    dispatch(clearSelectedDevice());
    dispatch(setPage({ mainpage, subpage: 'devices' }));
  };

  const handleClose = () => {
    dispatch(clearSelectedDevice());
  }

  const  handleDelete = async () => {
    dispatch(removeDevice(device.id));
    dispatch(clearSelectedDevice());
    dispatch(setPage({ mainpage, subpage: 'devices' }));
  }

  const ShowNetwork: React.FC<{ network: Network; index: number }> = ({ network, index }) => {
    return (
      <div>
        {index>0&&<br></br>}
        Network #{index+1}
        <br></br>MAC: {network.mac}<br></br>Hostname: {network.hostname}<br></br>IP: {network.ip} 
      </div>
    );
  };

  const ShowOs: React.FC<{ osversion: Osversion; index: number }> = ({ osversion, index }) => {
    return (
      <div>
        {index>0&&<br></br>}
        Os #{index+1}
        <br></br>Os: {osversion.name} {osversion.supplement}<br></br>Version: {osversion.version} 
      </div>
    );
  };

  if (device.id==="") {
    return (
      <div>
        war wohl nix
      </div>
    );
  }

  const buttons: Item[] = 
  [
    {
      name: 'Schliessen',
      title: 'Schliessen',
      color: 'blue',
      onClick: handleClose
    },
    {
      name: 'Ändern',
      title: 'Ändern',
      color: 'blue',
      onClick: openModalChange
    },
    {
      name: 'Löschen',
      title: 'Löschen',
      color: 'red',
      onClick: openModalDelete
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text={device.name} icon='list'/>
      <AddDeviceModal
        edittype={Edittype.EDIT}
        modalOpen={modalOpen[0]}
        onSubmit={submitChangedDevice}
        error={error}
        onClose={closeModal}
      />
      <AskModal
        header='Gerät löschen'
        prompt='Gerät löschen'
        modalOpen={modalOpen[1]}
        onSubmit={handleDelete}
        onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{device.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Kommentar</Table.Cell>
            <Table.Cell>{device.comment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Beschreibung</Table.Cell>
            <Table.Cell>{device.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gerätetyp</Table.Cell>
            <Table.Cell>{device.devicetype}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Netzwerk</Table.Cell>
            <Table.Cell>
              {device.networks.map((network: Network, index: number) => 
                <ShowNetwork key={network.mac} network={network} index={index} />
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Betriebssystem</Table.Cell>
            <Table.Cell>
              {device.osversions.map((osversion: Osversion, index: number) => 
                <ShowOs key={osversion.name} osversion={osversion} index={index} />
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
     </div>
  );
}

export default DeviceDetailsPage;