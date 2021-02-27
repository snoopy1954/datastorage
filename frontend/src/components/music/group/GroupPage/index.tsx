import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Group, GroupNoID } from '../../../../../../backend/src/types/basic';

import { getAll } from '../../../../services/postgres';

import { RootState } from '../../../../state/store';
import { addMusicgroup, updateMusicgroup, removeMusicgroup } from '../../../../state/music/groups/actions';
import { setSelectedGroup, clearSelectedGroup } from '../../../../state/music/group/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from "../../../basic/askModal";
import { GroupModal } from '../GroupModal';

import { formatData } from '../../../../utils/basic/import';
import { sortGroups } from '../../../../utils/basic/group';


export const GroupPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const groups: Group[] = useSelector((state: RootState) => state.musicgroups);      
  const group: Group = useSelector((state: RootState) => state.musicgroup);      

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
    dispatch(addMusicgroup(values));
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
    dispatch(updateMusicgroup(groupToChange));
    dispatch(clearSelectedGroup());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeMusicgroup(group.id));
    dispatch(clearSelectedGroup());
    closeModal();
  };  

  const handleImport = async () => {
    const groups = formatData(await getAll('musik', 'types'));
    for (let item=1; item<groups.length; item++) {
        const seqnr = +(groups[item].replace('{', '').replace('}', '').split(',')[1].split(':')[1].replace('"', '').replace('"', ''));
        const name = groups[item].replace('{', '').replace('}', '').split(',')[2].split(':')[1].replace('"', '').replace('"', '')
        const group: GroupNoID = {
            seqnr,
            name,
            subgroups: []
        };
        dispatch(addMusicgroup(group));
    }
  };

  const sortedGroups = sortGroups(Object.values(groups));

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
          {Object.values(sortedGroups).map((group: Group) => (
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
      <AppHeaderH3 text='Gruppen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button style={styleButton} onClick={() => handleImport()} disabled={true}>Import</Button>
       {Object.values(sortedGroups).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(sortedGroups).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
         </Table>
        </div>
      }
      {Object.values(sortedGroups).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
}

export default GroupPage;