import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Bookgroup, BookgroupNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';
import { addBookgroup, updateBookgroup, removeBookgroup } from '../../../../state/book/bookgrouplist/actions';
import { setSelectedBookgroup, clearSelectedBookgroup } from '../../../../state/book/selectedbookgroup/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from "../../../basic/askModal";
import { BookgroupModal } from '../BookgroupModal';


export const BookgroupPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const bookgroups = useSelector((state: RootState) => state.bookgroups);      
  const bookgroup = useSelector((state: RootState) => state.bookgroup);      

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };
  
  const openModalDelete = (bookgroup: Bookgroup): void => {
    dispatch(setSelectedBookgroup(bookgroup));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (bookgroup: Bookgroup): void => {
    dispatch(setSelectedBookgroup(bookgroup));
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (bookgroup: Bookgroup): void => {
    dispatch(setSelectedBookgroup(bookgroup));
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
  
  const actionAdd = async (values: BookgroupNoID) => {
    dispatch(addBookgroup(values));
    closeModal();
  };
          
  const actionShow = () => {
    dispatch(clearSelectedBookgroup());
    closeModal();
  };  
  
  const actionChange = async (values: BookgroupNoID) => {
    const bookgroupToChange: Bookgroup = {
      ...values,
      id: bookgroup.id
    };
    dispatch(updateBookgroup(bookgroupToChange));
    dispatch(clearSelectedBookgroup());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeBookgroup(bookgroup.id));
    dispatch(clearSelectedBookgroup());
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
          {Object.values(bookgroups).map((group: Bookgroup) => (
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
      <BookgroupModal
        edittype={Edittype.ADD}
        title='Neue Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <BookgroupModal
        edittype={Edittype.SHOW}
        title={'Gruppe ' + bookgroup.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <BookgroupModal
        edittype={Edittype.EDIT}
        title={'Gruppe ' + bookgroup.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Gruppe löschen'
        prompt={'Gruppe ' + bookgroup.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Filmgruppen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      {Object.values(bookgroups).length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {Object.values(bookgroups).length>8&&
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
         </Table>
        </div>
      }
      {Object.values(bookgroups).length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
   </div>
  );
}

export default BookgroupPage;