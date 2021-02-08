import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Group, GroupNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';
import { addDocumentgroup, updateDocumentgroup, removeDocumentgroup } from '../../../../state/document/groups/actions';
import { setSelectedGroup, clearSelectedGroup } from '../../../../state/document/group/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from "../../../basic/askModal";
import { GroupModal } from '../GroupModal';


export const GroupPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const groups: Group[] = useSelector((state: RootState) => state.documentgroups);      
  const group: Group = useSelector((state: RootState) => state.documentgroup);      

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };
  
  const openModalDelete = (group: Group): void => {
    dispatch(setSelectedGroup(group));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (group: Group): void => {
    dispatch(setSelectedGroup(group));
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (group: Group): void => {
    dispatch(setSelectedGroup(group));
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
  
  const actionAdd = async (values: GroupNoID) => {
    dispatch(addDocumentgroup(values));
    closeModal();
  };
          
  const actionShow = () => {
    dispatch(clearSelectedGroup());
    closeModal();
  };  
  
  const actionChange = async (values: GroupNoID) => {
    const groupToChange: Group = {
      ...values,
      id: group.id
    };
    dispatch(updateDocumentgroup(groupToChange));
    dispatch(clearSelectedGroup());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeDocumentgroup(group.id));
    dispatch(clearSelectedGroup());
    closeModal();
  };  

  return (
    <div className="App">
      <GroupModal
        edittype={Edittype.ADD}
        title='Neue Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <GroupModal
        edittype={Edittype.SHOW}
        title={'Gruppe ' + group.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <GroupModal
        edittype={Edittype.EDIT}
        title={'Gruppe ' + group.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Gruppe löschen'
        prompt={'Gruppe ' + group.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Dokumentgruppen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='ten wide center aligned' style={{ backgroundColor}} >Name</Table.HeaderCell>
            <Table.HeaderCell className='four wide center aligned' style={{ backgroundColor}} >Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(groups).map((group: Group) => (
            <Table.Row key={group.id}>
              <Table.Cell>{group.name}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(group)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(group)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(group)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default GroupPage;