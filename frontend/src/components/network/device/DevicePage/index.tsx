import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Device, DeviceNoID, Os } from '../../../../../../backend/src/types/network';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { clearSelectedOs } from  '../../../../state/network/selectedos/actions';
import { addDevice, updateDevice, removeDevice } from  '../../../../state/network/devicelist/actions'; 
import { setSelectedDevice, clearSelectedDevice } from  '../../../../state/network/selecteddevice/actions';
import { clearSelectedVersions, setSelectedVersions } from  '../../../../state/network/selectedversions/actions'; 

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { DeviceModal } from '../DeviceModal';


export const DevicePage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const devices = useSelector((state: RootState) => state.devices);
  const device = useSelector((state: RootState) => state.device);
  const oss = useSelector((state: RootState) => state.oss);

  React.useEffect(() => {
    dispatch(clearSelectedOs());
  }, [dispatch]);  

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (type: Device): void => {
    dispatch(setSelectedDevice(type));
    setModalOpen([false, true, false, false]);
  };
  
  const openModalChange = (device: Device): void => {
    dispatch(setSelectedDevice(device));
    dispatch(clearSelectedVersions());
    device.osversions.forEach((osversion, index) => {
      const selectedOs: Os[] = Object.values(oss).filter((os => os.name === osversion.name));
      const selectedversions: string[] = selectedOs.length===0 ? [] : selectedOs[0].versions;
      dispatch(setSelectedVersions(index, selectedversions));
    });    
    setModalOpen([false, false, true, false]);
  };
  
  const openModalShow = (type: Device): void => {
    dispatch(setSelectedDevice(type));
    setModalOpen([false, false, false, true]);
  };
  
  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
  };

  const closeModal = (): void => {
    setModalOpen([false, false, false, false]);
  };

  const actionShow = () => {
    dispatch(clearSelectedDevice());
    closeModal();
  };  

  const actionAdd = (values: DeviceNoID) => {
    dispatch(addDevice(values));
    closeModal();
  };

  const actionChange = async (values: DeviceNoID) => {
    const deviceToChange: Device = {
      ...values,
      id: device.id
    }
    dispatch(updateDevice(deviceToChange));
    dispatch(clearSelectedDevice());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeDevice(device.id));
    dispatch(clearSelectedDevice());
    closeModal();
  };  

  return (
    <div className="App">
      <DeviceModal
        edittype={Edittype.ADD}
        title='Neues Gerät anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <DeviceModal
        edittype={Edittype.SHOW}
        title={'Gerät ' + device.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <DeviceModal
        edittype={Edittype.EDIT}
        title={'Gerät ' + device.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Gerät löschen'
        prompt={'Gerät ' + device.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Geräteliste' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='six wide center aligned'>Kommentar</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(devices).map((device: Device) => (
            <Table.Row key={device.id}>
              <Table.Cell>{device.name}</Table.Cell>
              <Table.Cell>{device.comment}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(device)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(device)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(device)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DevicePage;