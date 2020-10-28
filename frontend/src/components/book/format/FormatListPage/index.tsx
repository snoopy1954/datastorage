import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Format, FormatNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addFormat } from '../../../../state/book/formatlist/actions';
import { setSelectedFormat, clearSelectedFormat } from '../../../../state/book/selectedformat/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import AddFormatModal from "../AddFormatModal";
import FormatDetailsPage from "../FormatDetailsPage";


const FormatListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatchRedux = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const formats = useSelector((state: RootState) => state.formats);      
    const format = useSelector((state: RootState) => state.format);      

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewFormat = async (values: FormatNoID) => {
      dispatchRedux(addFormat(values));
      closeModal();
    };

    const handleSelection = (format: Format) => {
      dispatchRedux(setSelectedFormat(format));
    };  

    const handleClose = () => {
      dispatchRedux(clearSelectedFormat());
      dispatchRedux(setPage({ mainpage, subpage: 'books' }));
    };

    if (format.id!=="") {
      return (
        <FormatDetailsPage/>
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