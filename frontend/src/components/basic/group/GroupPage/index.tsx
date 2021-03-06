import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Group, GroupNoID } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';
import { addGroup, updateGroup, removeGroup } from '../../../../state/basic/groups/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from "../../../basic/askModal";
import { GroupModal } from '../GroupModal';

import { emptyGroup } from '../../../../utils/basic/group';


interface Props {
  title: string;
  createGroupDB: (group: GroupNoID) => Promise<Group>;
  updateGroupDB: (group: Group) => Promise<Group>;
  removeGroupDB: (id: string) => Promise<void>;
};

export const GroupPage: React.FC<Props> = ({ title, createGroupDB, updateGroupDB, removeGroupDB }: Props) => {
  const [group, setGroup] = useState<Group>(emptyGroup());
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const groups: Group[] = useSelector((state: RootState) => state.groups);

  const dispatch = useDispatch();

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
    const group: Group = await createGroupDB(values);
    dispatch(addGroup(group));
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
    const groupChanged: Group = await updateGroupDB(groupToChange);
    dispatch(updateGroup(groupChanged));
    setGroup(emptyGroup());
    closeModal();
  };
  
  const actionDelete = async () => {
    await removeGroupDB(group.id);
    dispatch(removeGroup(group.id));
    setGroup(emptyGroup());
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
          {Object.values(groups).map((group: Group) => (
            <Table.Row key={group.id}>
              <Table.Cell style={{ backgroundColor, width: '55%' } } className='left aligned'>{group.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(group)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(group)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(group)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
       </Table.Body>        
    );
  };

  return (
    <div className="App">
      <GroupModal
        edittype={Edittype.ADD}
        title='Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        group={group}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <GroupModal
        edittype={Edittype.SHOW}
        title={`${title} '${group.name}' anzeigen`}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        group={group}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <GroupModal
        edittype={Edittype.EDIT}
        title={`${title} '${group.name}' ändern`}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        group={group}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header={`${title} löschen`}
        prompt={`${title} '${group.name}' löschen`}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={`${title}`} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(groups).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(groups).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
         </Table>
        </div>
      }
      {Object.values(groups).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
  </div>
  );
}

export default GroupPage;