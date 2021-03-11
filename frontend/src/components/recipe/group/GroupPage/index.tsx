import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Group, GroupNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';
import { addRecipegroup, updateRecipegroup, removeRecipegroup } from '../../../../state/recipe/groups/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from "../../../basic/askModal";
import { GroupModal } from '../GroupModal';

import { emptyGroup } from '../../../../utils/basic/group';


export const GroupPage: React.FC = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const [group, setGroup] = useState<Group>(emptyGroup());
  const groups: Group[] = useSelector((state: RootState) => state.recipegroups);

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };
  
  const openModalDelete = (group: Group): void => {
    setGroup(group);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (group: Group): void => {
    setGroup(group);
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (group: Group): void => {
    setGroup(group);
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
    dispatch(addRecipegroup(values));
    closeModal();
  };
          
  const actionShow = () => {
    setGroup(emptyGroup());
    closeModal();
  };  
  
  const actionChange = async (values: GroupNoID) => {
    const groupToChange: Group = {
      ...values,
      id: group.id
    };
    dispatch(updateRecipegroup(groupToChange));
    setGroup(emptyGroup());
    closeModal();
  };
  
  const actionDelete = async () => {
    dispatch(removeRecipegroup(group.id));
    setGroup(emptyGroup());
    closeModal();
  };  

  return (
    <div className="App">
      <GroupModal
        edittype={Edittype.ADD}
        title='Neue Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        group={group}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <GroupModal
        edittype={Edittype.SHOW}
        title={'Gruppe ' + group.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        group={group}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <GroupModal
        edittype={Edittype.EDIT}
        title={'Gruppe ' + group.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        group={group}
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
      <AppHeaderH3 text='Rezeptgruppen' icon='list'/>
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