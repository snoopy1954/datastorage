import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { Devicetype, DevicetypeNoID } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';
import { addDevicetype, updateDevicetype, removeDevicetype } from  '../../../../state/network/devicetypelist/actions';
import { setSelectedDevicetype, clearSelectedDevicetype } from "../../../../state/network/selecteddevicetype/actions";
import { clearSelectedOs } from  '../../../../state/network/selectedos/actions';
import { clearSelectedDevice} from  '../../../../state/network/selecteddevice/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { DevicetypeModal } from '../DevicetypeModal';


export const DevicetypePage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

    const devicetypes = useSelector((state: RootState) => state.devicetypes);
    const devicetype = useSelector((state: RootState) => state.devicetype);

    React.useEffect(() => {
      dispatch(clearSelectedDevice());
      dispatch(clearSelectedOs());
    }, [dispatch]);  

    const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
    const openModalDelete = (type: Devicetype): void => {
      dispatch(setSelectedDevicetype(type));
      setModalOpen([false, true, false, false]);
    };
    
    const openModalChange = (type: Devicetype): void => {
      dispatch(setSelectedDevicetype(type));
      setModalOpen([false, false, true, false]);
    };
    
    const openModalShow = (type: Devicetype): void => {
      dispatch(setSelectedDevicetype(type));
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
      dispatch(clearSelectedDevicetype());
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
      dispatch(clearSelectedDevicetype());
      closeModal();
    };

    const actionDelete = () => {
      dispatch(removeDevicetype(devicetype.id));
      dispatch(clearSelectedDevicetype());
      closeModal();
    };  
    
    return (
        <div className="App">
          <DevicetypeModal
            edittype={Edittype.ADD}
            title='Neuen Gerätetyp anlegen'
            modalOpen={modalOpen[ModalDialog.NEW]}
            onSubmit={actionAdd}
            onClose={closeModal}
          />
          <DevicetypeModal
            edittype={Edittype.SHOW}
            title={'Gerätetyp ' + devicetype.name + ' anzeigen'}
            modalOpen={modalOpen[ModalDialog.SHOW]}
            onSubmit={actionShow}
            onClose={closeModal}
          />
          <DevicetypeModal
            edittype={Edittype.EDIT}
            title={'Gerätetyp ' + devicetype.name + ' ändern'}
            modalOpen={modalOpen[ModalDialog.CHANGE]}
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