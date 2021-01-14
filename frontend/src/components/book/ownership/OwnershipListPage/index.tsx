import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Ownership, OwnershipNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addOwnership } from '../../../../state/book/ownershiplist/actions';
import { setSelectedOwnership, clearSelectedOwnership } from '../../../../state/book/selectedownership/actions';

import { AppHeaderH3 } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddOwnershipModal from "../AddOwnershipModal";
import OwnershipDetailsPage from "../OwnershipDetailsPage";


const OwnershipListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const ownerships = useSelector((state: RootState) => state.ownerships);      
    const ownership = useSelector((state: RootState) => state.ownership);      

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewOwnership = async (values: OwnershipNoID) => {
      dispatch(addOwnership(values));
      closeModal();
    };

    const handleSelection = (ownership: Ownership) => {
      dispatch(setSelectedOwnership(ownership));
    };  

    const handleClose = () => {
      dispatch(clearSelectedOwnership());
      dispatch(setPage({ mainpage, subpage: 'books' }));
    };

    if (ownership.id!=="") {
      return (
        <OwnershipDetailsPage/>
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
        <AppHeaderH3 text='Besitztypen' icon='list'/>
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