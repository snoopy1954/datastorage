import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Os, OsNoID } from '../../../../../../backend/src/types/network';

import { RootState } from '../../../../state/store';
import { addOs, updateOs, removeOs } from  '../../../../state/network/oss/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from "../../../basic/askModal";
import { OsModal } from '../OsModal';

import { emptyOs } from '../../../../utils/network/os';


export const OsPage: React.FC = () => {
  const [os, setOs] = React.useState<Os>(emptyOs());
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const oss = useSelector((state: RootState) => state.oss);

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };

  const openModalDelete = (os: Os): void => {
    setOs(os);
    setModalOpen([false, true, false, false]);
  };
  
  const openModalChange = (os: Os): void => {
    setOs(os);
    setModalOpen([false, false, true, false]);
  };
  
  const openModalShow = (os: Os): void => {
    setOs(os);
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

  const actionAdd = async (values: OsNoID) => {
    dispatch(addOs(values));
    closeModal();
  };

  const actionShow = () => {
    setOs(emptyOs);
    closeModal();
  };  

  const actionChange = async (values: OsNoID) => {
    const osToChange: Os = {
      ...values,
      id: os.id
    };
    dispatch(updateOs(osToChange));
    setOs(emptyOs);
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeOs(os.id));
    setOs(emptyOs);
    closeModal();
  };  

  return (
    <div className="App">
      <OsModal
        edittype={Edittype.ADD}
        title='Neues Betriebssystem anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        os={os}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <OsModal
        edittype={Edittype.SHOW}
        title={'Betriebssystem ' + os.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        os={os}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <OsModal
        edittype={Edittype.EDIT}
        title={'Betriebssystem ' + os.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        os={os}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Betriebssystem löschen'
        prompt={'Betriebssystem ' + os.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Betriebssysteme' icon='list'/>
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
          {Object.values(oss).map((os: Os) => (
            <Table.Row key={os.id}>
              <Table.Cell>{os.name}</Table.Cell>
              <Table.Cell>{os.description}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(os)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(os)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(os)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default OsPage;