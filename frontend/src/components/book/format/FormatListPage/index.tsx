import React from "react";
import { Table } from "semantic-ui-react";

import { useStateValue, addFormat, setSelectedFormat, clearSelectedFormat, setPage } from "../../../../state";
import { Format, FormatNoID } from "../../../../types/book";
import { create } from "../../../../services/book/formats";
import AddFormatModal from "../AddFormatModal";
import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";


const FormatListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ formats }, dispatch] = useStateValue();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewFormat = async (values: FormatNoID) => {
      const newFormat = await create(values);
      dispatch(addFormat(newFormat));
      closeModal();
    };

    const handleSelection = (format: Format) => {
      dispatch(setSelectedFormat(format));
      dispatch(setPage('books'));
    };  

    const handleClose = () => {
      dispatch(clearSelectedFormat());
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
          <AppHeaderH3Plus text='Formate' icon='list'/>
          <AddFormatModal
            modalOpen={modalOpen}
            onSubmit={handleNewFormat}
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
              {Object.values(formats).map((format: Format) => (
                <Table.Row key={format.id}  onClick={() => handleSelection(format)}>
                  <Table.Cell>{format.formatname.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default FormatListPage;