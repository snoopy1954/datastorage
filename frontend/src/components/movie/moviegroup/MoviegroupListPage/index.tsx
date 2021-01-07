import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from '../../../../constants';

import { Moviegroup, MoviegroupNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addMoviegroup } from '../../../../state/movie/moviegrouplist/actions';
import { setSelectedMoviegroup, clearSelectedMoviegroup } from '../../../../state/movie/selectedmoviegroup/actions';

import { AppHeaderH3Plus } from '../../../basic/header';
import { AppMenu, Item } from '../../../basic/menu';
import { MoviegroupDetailsPage } from '../MoviegroupDetailsPage';
import { AddMoviegroupModal } from '../AddMoviegroupModal';


export const MoviegroupListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const moviegroups = useSelector((state: RootState) => state.moviegroups);      
    const moviegroup = useSelector((state: RootState) => state.moviegroup);      

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewMoviegroup = async (values: MoviegroupNoID) => {
      dispatch(addMoviegroup(values));
      closeModal();
    };

    const handleSelection = (moviegroup: Moviegroup) => {
      dispatch(setSelectedMoviegroup(moviegroup));
    };  

    const handleClose = () => {
      dispatch(clearSelectedMoviegroup());
      dispatch(setPage({ mainpage, subpage: 'movies' }));
    }

    if (moviegroup.id!=='') {
      return (
        <MoviegroupDetailsPage/>
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
          <AppHeaderH3Plus text='Filmgruppen' icon='list'/>
          <AddMoviegroupModal
            modalOpen={modalOpen}
            onSubmit={handleNewMoviegroup}
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
              {Object.values(moviegroups).map((moviegroup: Moviegroup) => (
                <Table.Row key={moviegroup.id} onClick={() => handleSelection(moviegroup)}>
                  <Table.Cell>{moviegroup.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default MoviegroupListPage;