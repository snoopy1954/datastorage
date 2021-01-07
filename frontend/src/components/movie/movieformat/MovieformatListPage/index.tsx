import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from "../../../../constants";

import { Movieformat, MovieformatNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addMovieformat } from '../../../../state/movie/movieformatlist/actions';
import { setSelectedMovieformat, clearSelectedMovieformat } from '../../../../state/movie/selectedmovieformat/actions';

import { AppHeaderH3Plus } from '../../../basic/header';
import { AppMenu, Item } from '../../../basic/menu';
import { AddMovieformatModal } from '../AddMovieformatModal';
import { MovieformatDetailsPage } from '../MovieformatDetailsPage';


export const MovieformatListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatchRedux = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const movieformats = useSelector((state: RootState) => state.movieformats);      
    const movieformat = useSelector((state: RootState) => state.movieformat);      

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleNewMovieformat = async (values: MovieformatNoID) => {
      dispatchRedux(addMovieformat(values));
      closeModal();
    };

    const handleSelection = (format: Movieformat) => {
      dispatchRedux(setSelectedMovieformat(format));
    };  

    const handleClose = () => {
      dispatchRedux(clearSelectedMovieformat());
      dispatchRedux(setPage({ mainpage, subpage: 'books' }));
    };

    if (movieformat.id!=="") {
      return (
        <MovieformatDetailsPage/>
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
          <AddMovieformatModal
            modalOpen={modalOpen}
            onSubmit={handleNewMovieformat}
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
              {Object.values(movieformats).map((movieformat: Movieformat) => (
                <Table.Row key={movieformat.id}  onClick={() => handleSelection(movieformat)}>
                  <Table.Cell>{movieformat.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
}

export default MovieformatListPage;