import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Ownership, OwnershipNoID } from '../../../../../../backend/src/types/book';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addOwnership, removeOwnership, updateOwnership } from '../../../../state/book/ownershiplist/actions';
import { setSelectedOwnership, clearSelectedOwnership } from '../../../../state/book/selectedownership/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from '../../../basic/askModal';
import { OwnershipModal } from "../OwnershipModal";


export const OwnershipPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const ownerships = useSelector((state: RootState) => state.ownerships);
  const ownership = useSelector((state: RootState) => state.ownership);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (ownership: Ownership): Promise<void> => {
    dispatch(setSelectedOwnership(ownership));
    setModalOpen([false, true, false, false]);
  };
     
  const openModalChange = async (ownership: Ownership): Promise<void> => {
    dispatch(setSelectedOwnership(ownership));
    setModalOpen([false, false, true, false]);
  };
 
  const openModalShow = async (ownership: Ownership): Promise<void> => {
    dispatch(setSelectedOwnership(ownership));
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

  const actionAdd = async (values: OwnershipNoID) => {
    dispatch(addOwnership(values));
    closeModal();
  };
    
  const actionShow = () => {
    dispatch(clearSelectedOwnership());
    closeModal();
  };  
  
  const actionChange = async (values: OwnershipNoID) => {
    const ownershipToChange: Ownership = {
      ...values,
      id: ownership.id
    };
    dispatch(updateOwnership(ownershipToChange));
    dispatch(clearSelectedOwnership());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeOwnership(ownership.id));
    dispatch(clearSelectedOwnership());
    closeModal();
  };

  return (
    <div className="App">
      <OwnershipModal
        edittype={Edittype.ADD}
        title='Neuen Besitztyp anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <OwnershipModal
        edittype={Edittype.SHOW}
        title={'Besitztyp ' + ownership.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <OwnershipModal
        edittype={Edittype.EDIT}
        title={'Besitztyp ' + ownership.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Besitztyp löschen'
        prompt={'Besitztyp ' + ownership.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Besitztypen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='ten wide center aligned' style={{ backgroundColor}} >Name</Table.HeaderCell>
            <Table.HeaderCell className='four wide center aligned' style={{ backgroundColor}} >Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(ownerships).map((ownership: Ownership) => (
            <Table.Row key={ownership.id}>
              <Table.Cell>{ownership.name}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(ownership)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(ownership)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(ownership)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OwnershipPage;