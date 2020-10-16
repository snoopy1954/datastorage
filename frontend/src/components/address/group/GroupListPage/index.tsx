import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addBookgroup, setSelectedBookgroup, clearSelectedBookgroup, setPage } from "../../../../state";
import { Bookgroup, BookgroupNoID } from "../../../../types/book";
import { create } from "../../../../services/book/bookgroups";
import BookgroupDetailsPage from "../BookgroupDetailsPage";
import AddBookgroupModal from "../AddBookgroupModal";
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";


const BookgroupListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ bookgroups, bookgroup }, dispatch] = useStateValue();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewBookgroup = async (values: BookgroupNoID) => {
      const newBookgroup = await create(values);
      dispatch(addBookgroup(newBookgroup));
      closeModal();
    };

    const handleSelection = (bookgroup: Bookgroup) => {
      dispatch(setSelectedBookgroup(bookgroup));
    };  

    const handleClose = () => {
      dispatch(clearSelectedBookgroup());
      dispatch(setPage('books'));
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
    
    if (bookgroup) {
      return (
        <BookgroupDetailsPage/>
      )
    }
      
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