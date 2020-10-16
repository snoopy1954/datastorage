import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addOwnership, setSelectedOwnership, clearSelectedOwnership, setPage } from "../../../../state";
import { Ownership, OwnershipNoID } from "../../../../types/book";
import { create } from "../../../../services/book/ownerships";
import AddOwnershipModal from "../AddOwnershipModal";
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";


const OwnershipListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ ownerships }, dispatch] = useStateValue();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewOwnership = async (values: OwnershipNoID) => {
      const newOwnership = await create(values);
      dispatch(addOwnership(newOwnership));
      closeModal();
    };

    const handleSelection = (ownership: Ownership) => {
      dispatch(setSelectedOwnership(ownership));
      dispatch(setPage('books'));
    };  

    const handleClose = () => {
      dispatch(clearSelectedOwnership());
      dispatch(setPage('books'));
    };

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
          <AppHeaderH3Plus text='Besitztypen' icon='list'/>
          <AddOwnershipModal
            modalOpen={modalOpen}
            onSubmit={handleNewOwnership}
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
              {Object.values(ownerships).map((ownership: Ownership) => (
                <Table.Row key={ownership.id} onClick={() => handleSelection(ownership)}>
                  <Table.Cell>{ownership.ownershipname.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default OwnershipListPage;