import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Bookgroup, BookgroupNoID } from "../../../../types/book";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addBookgroup } from '../../../../state/book/bookgrouplist/actions';
import { setSelectedBookgroup, clearSelectedBookgroup } from '../../../../state/book/selectedbookgroup/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import BookgroupDetailsPage from "../BookgroupDetailsPage";
import AddBookgroupModal from "../AddBookgroupModal";


const BookgroupListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const bookgroups = useSelector((state: RootState) => state.bookgroups);      
    const bookgroup = useSelector((state: RootState) => state.bookgroup);      

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewBookgroup = async (values: BookgroupNoID) => {
      dispatch(addBookgroup(values));
      closeModal();
    };

    const handleSelection = (bookgroup: Bookgroup) => {
      dispatch(setSelectedBookgroup(bookgroup));
    };  

    const handleClose = () => {
      dispatch(clearSelectedBookgroup());
      dispatch(setPage({ mainpage, subpage: 'books' }));
    }

    if (bookgroup.id!=='') {
      return (
        <BookgroupDetailsPage/>
      )
    }
      
    const buttons: Item[] = 
    [
      {
        name: 'Schliessen',
        title: 'Schliessen',
        color: 'blue',
        onClick: handleClose
      },
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        onClick: openModal
      },
    ]; 
    
    return (
        <div className="App">
          <AppHeaderH3Plus text='Buchgruppen' icon='list'/>
          <AddBookgroupModal
            modalOpen={modalOpen}
            onSubmit={handleNewBookgroup}
            error={error}
            onClose={closeModal}
          />
          <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(bookgroups).map((bookgroup: Bookgroup) => (
                <Table.Row key={bookgroup.id} onClick={() => handleSelection(bookgroup)}>
                  <Table.Cell>{bookgroup.groupname.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default BookgroupListPage;