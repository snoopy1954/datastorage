import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Devicetype, DevicetypeNoID } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';
import { addDevicetype, updateDevicetype, removeDevicetype } from  '../../../../state/network/devicetypes/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { DevicetypeModal } from '../DevicetypeModal';

import { emptyDevicetype } from '../../../../utils/network/devicetype';


export const DevicetypePage: React.FC = () => {
  const [devicetype, setDevicetype] = React.useState<Devicetype>(emptyDevicetype());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const dispatch = useDispatch();

    const devicetypes = useSelector((state: RootState) => state.devicetypes);

    const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
    const openModalDelete = (type: Devicetype): void => {
      setDevicetype(type);
      setModalOpen([false, true, false, false]);
    };
    
    const openModalChange = (type: Devicetype): void => {
      setDevicetype(type);
      setModalOpen([false, false, true, false]);
    };
    
    const openModalShow = (type: Devicetype): void => {
      setDevicetype(type);
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
      setDevicetype(emptyDevicetype());
      closeModal();
    };  

    const actionAdd = async (values: DevicetypeNoID) => {
      dispatch(addDevicetype(values));
      closeModal();
    };

    const actionChange = async (values: DevicetypeNoID) => {
      const devicetypeToChange: Devicetype = {
        ...values,
        id: devicetype.id
      }
      dispatch(updateDevicetype(devicetypeToChange));
      setDevicetype(emptyDevicetype());
      closeModal();
    };

    const actionDelete = () => {
      dispatch(removeDevicetype(devicetype.id));
      setDevicetype(emptyDevicetype());
      closeModal();
    };  
    
    return (
        <div className="App">
          <DevicetypeModal
            edittype={Edittype.ADD}
            title='Neuen Gerätetyp anlegen'
            modalOpen={modalOpen[ModalDialog.NEW]}
            devicetype={devicetype}
            onSubmit={actionAdd}
            onClose={closeModal}
          />
          <DevicetypeModal
            edittype={Edittype.SHOW}
            title={'Gerätetyp ' + devicetype.name + ' anzeigen'}
            modalOpen={modalOpen[ModalDialog.SHOW]}
            devicetype={devicetype}
            onSubmit={actionShow}
            onClose={closeModal}
          />
          <DevicetypeModal
            edittype={Edittype.EDIT}
            title={'Gerätetyp ' + devicetype.name + ' ändern'}
            modalOpen={modalOpen[ModalDialog.CHANGE]}
            devicetype={devicetype}
            onSubmit={actionChange}
            onClose={closeModal}
          />
          <AskModal
            header='Gerätetyp löschen'
            prompt={'Gerätetyp ' + devicetype.name + ' löschen?'}
            modalOpen={modalOpen[ModalDialog.DELETE]}
            onSubmit={actionDelete}
            onClose={closeModal}
          />
          <AppHeaderH3 text='Gerätetypen' icon='list'/>
          <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
          <Table celled compact small='true' style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ backgroundColor }} className='one wide center aligned'>Name</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='six wide center aligned'>Beschreibung</Table.HeaderCell>
                <Table.HeaderCell style={{ backgroundColor }} className='three wide center aligned'>Aktion</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(devicetypes).map((devicetype: Devicetype) => (
                <Table.Row key={devicetype.id}>
                  <Table.Cell>{devicetype.name}</Table.Cell>
                  <Table.Cell>{devicetype.description}</Table.Cell>
                  <Table.Cell>
                    <Button style={styleButton} onClick={() => openModalShow(devicetype)}>Anzeigen</Button>
                    <Button style={styleButton} onClick={() => openModalChange(devicetype)}>Ändern</Button>
                    <Button style={styleButton} onClick={() => openModalDelete(devicetype)}>Löschen</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default DevicetypePage;