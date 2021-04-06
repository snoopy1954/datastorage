import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Device, DeviceNoID } from '../../../../../../backend/src/types/network';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addDevice, updateDevice, removeDevice } from  '../../../../state/network/devices/actions'; 

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { DeviceModal } from '../DeviceModal';

import { emptyDevice } from '../../../../utils/network/device';


export const DevicePage: React.FC = () => {
  const [device, setDevice] = React.useState<Device>(emptyDevice());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const devices = useSelector((state: RootState) => state.devices);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (device: Device): void => {
    setDevice(device);
    setModalOpen([false, true, false, false]);
  };
  
  const openModalChange = (device: Device): void => {
    setDevice(device);
    setModalOpen([false, false, true, false]);
  };
  
  const openModalShow = (device: Device): void => {
    setDevice(device);
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
    setDevice(emptyDevice());
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
    setDevice(emptyDevice());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeDevice(device.id));
    setDevice(emptyDevice());
    closeModal();
  };  

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Name</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Kommentar</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor, width: '35%' }} className='center aligned'>Beschreibung</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
};

const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(devices).map((device: Device) => (
            <Table.Row key={device.id}>
              <Table.Cell style={{ backgroundColor, width: '5%' } } >{device.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } >{device.comment}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '35%' } } >{device.description}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(device)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(device)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(device)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
};

  return (
    <div className="App">
      <DeviceModal
        edittype={Edittype.ADD}
        title='Neues Gerät anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        device={device}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <DeviceModal
        edittype={Edittype.SHOW}
        title={'Gerät ' + device.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        device={device}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <DeviceModal
        edittype={Edittype.EDIT}
        title={'Gerät ' + device.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        device={device}
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
      {Object.values(devices).length>8&&
                <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
                    <ShowTableHeader/>
                </Table>
            }
            {Object.values(devices).length>8&&
                <div style={{ overflowY: 'scroll', height: '550px' }}>
                    <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
                        <ShowTableBody/>
                    </Table>
                </div>
            }
            {Object.values(devices).length<9&&
                <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
                    <ShowTableHeader/>
                    <ShowTableBody/>
                </Table>
            }
      {/* <Table celled compact small='true' style={{ backgroundColor }}>
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
      </Table> */}
    </div>
  );
}

export default DevicePage;