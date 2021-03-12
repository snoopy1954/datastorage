import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton } from '../../../../constants';

import { Ownership, OwnershipNoID } from '../../../../../../backend/src/types/book';
import { Edittype } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addOwnership, removeOwnership, updateOwnership } from '../../../../state/book/ownerships/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AskModal } from '../../../basic/askModal';
import { OwnershipModal } from "../OwnershipModal";

import { emptyOwnership } from '../../../../utils/book/ownership';


export const OwnershipPage: React.FC = () => {
  const [ownership, setOwnership] = useState<Ownership>(emptyOwnership());
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const ownerships = useSelector((state: RootState) => state.ownerships);

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (ownership: Ownership): Promise<void> => {
    setOwnership(ownership);
    setModalOpen([false, true, false, false]);
  };
     
  const openModalChange = async (ownership: Ownership): Promise<void> => {
    setOwnership(ownership);
    setModalOpen([false, false, true, false]);
  };
 
  const openModalShow = async (ownership: Ownership): Promise<void> => {
    setOwnership(ownership);
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
    setOwnership(emptyOwnership());
    closeModal();
  };  
  
  const actionChange = async (values: OwnershipNoID) => {
    const ownershipToChange: Ownership = {
      ...values,
      id: ownership.id
    };
    dispatch(updateOwnership(ownershipToChange));
    setOwnership(emptyOwnership());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeOwnership(ownership.id));
    setOwnership(emptyOwnership());
    closeModal();
  };

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '55%' }} className='center aligned'>Name</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(ownerships).map((ownership: Ownership) => (
           <Table.Row key={ownership.id}>
              <Table.Cell style={{ backgroundColor, width: '55%' } } className='left aligned'>{ownership.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(ownership)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(ownership)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(ownership)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
       </Table.Body>        
    );
  };

  return (
    <div className="App">
      <OwnershipModal
        edittype={Edittype.ADD}
        title='Neuen Besitztyp anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        ownership={ownership}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <OwnershipModal
        edittype={Edittype.SHOW}
        title={'Besitztyp ' + ownership.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        ownership={ownership}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <OwnershipModal
        edittype={Edittype.EDIT}
        title={'Besitztyp ' + ownership.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        ownership={ownership}
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
      {Object.values(ownerships).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(ownerships).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
         </Table>
        </div>
      }
      {Object.values(ownerships).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
};

export default OwnershipPage;