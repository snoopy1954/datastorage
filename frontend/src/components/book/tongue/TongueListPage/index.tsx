import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";

import { Tongue, TongueNoID } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addTongue } from '../../../../state/book/tonguelist/actions';
import { setSelectedTongue, clearSelectedTongue } from '../../../../state/book/selectedtongue/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenu, Item } from "../../../basic/menu";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import TongueDetailsPage from "../TongueDetailsPage";
import AddTongueModal from "../AddTongueModal";


const TongueListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const tongues = useSelector((state: RootState) => state.tongues);
    const tongue = useSelector((state: RootState) => state.tongue);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewTongue = async (values: TongueNoID) => {
      dispatch(addTongue(values));
      closeModal();
    };

    const handleSelection = (tongue: Tongue) => {
      dispatch(setSelectedTongue(tongue));
    };  

    const handleClose = () => {
      dispatch(clearSelectedTongue());
      dispatch(setPage({ mainpage, subpage: 'books' }));
    };

    if (tongue.id!=="") {
      return (
        <TongueDetailsPage/>
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