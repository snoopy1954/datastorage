import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addTongue, setSelectedTongue, clearSelectedTongue, setPage } from "../../../../state";
import { Tongue, TongueNoID } from "../../../../types/book";
import { create } from "../../../../services/book/tongues";
import AddTongueModal from "../AddTongueModal";
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";


const TongueListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ tongues }, dispatch] = useStateValue();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewTongue = async (values: TongueNoID) => {
      const newTongue = await create(values);
      dispatch(addTongue(newTongue));
      closeModal();
    };

    const handleSelection = (tongue: Tongue) => {
      dispatch(setSelectedTongue(tongue));
      dispatch(setPage('books'));
    };  

    const handleClose = () => {
      dispatch(clearSelectedTongue());
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
          <AppHeaderH3Plus text='Sprachen' icon='list'/>
          <AddTongueModal
            modalOpen={modalOpen}
            onSubmit={submitNewTongue}
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
              {Object.values(tongues).map((tongue: Tongue) => (
                <Table.Row key={tongue.id} onClick={() => handleSelection(tongue)}>
                  <Table.Cell>{tongue.tonguename.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default TongueListPage;