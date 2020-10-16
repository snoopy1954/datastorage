import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addDevice, clearSelectedOs, setSelectedDevice, clearFilteredVersions, addFilteredVersions, setFilteredVersions } from "../../../../state";
import { Device, Os } from "../../../../types/network";
import { Edittype } from "../../../../types/basic";
import { create } from "../../../../services/device/devices";
import { DeviceFormValues } from "../AddDeviceModal/AddDeviceForm";
import AddDeviceModal from "../AddDeviceModal";
import DeviceDetailsPage from "../DeviceDetailsPage";
import { AppHeaderH3Plus } from "../../../basic/header";
import AppMenu from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";
import { Item } from "../../../basic/menu";


const DeviceListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ devices, device, oss }, dispatch] = useStateValue();

  React.useEffect(() => {
    dispatch(clearSelectedOs());
  }, [dispatch]);  

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewDevice = async (values: DeviceFormValues) => {
    try {
      const newDevice = await create(values);
      dispatch(addDevice(newDevice));
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
    closeModal();
  };

  const handleSelection = (device: Device) => {
    dispatch(setSelectedDevice(device))
    dispatch(clearFilteredVersions());
    device.osversions.forEach((osversion, index) => {
      const selectedOs: Os[] = Object.values(oss).filter((os => os.name === osversion.name));
      dispatch(addFilteredVersions());
      const selectedversions: string[] = selectedOs.length===0 ? [] : selectedOs[0].versions;
      dispatch(setFilteredVersions({ id: index, versions: selectedversions }));
    });    
  }

  if (device) {
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