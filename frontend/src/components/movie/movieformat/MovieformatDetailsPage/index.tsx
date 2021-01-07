import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from '../../../../constants';

import { RootState } from '../../../../state/store';
import { removeMovieformat } from '../../../../state/movie/movieformatlist/actions';
import { clearSelectedMovieformat } from '../../../../state/movie/selectedmovieformat/actions';

import { AppHeaderH3Plus } from '../../../basic/header';
import { AppMenu, Item } from '../../../basic/menu';
import { AskModal } from '../../../basic/askModal';


export const MovieformatDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const movieformat = useSelector((state: RootState) => state.movieformat);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
      setModalOpen(false);
  };

  const handleClose = () => {
    dispatch(clearSelectedMovieformat());
  }

  const  handleDelete = async () => {
    if (movieformat.id!=='') {
      dispatch(removeMovieformat(movieformat.id));
      dispatch(clearSelectedMovieformat());
    }
    closeModal();
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
      name: 'Löschen',
      title: 'Löschen',
      color: 'red',
      onClick: openModal
    },
  ];

  return (
    <div className="App">
      <AppHeaderH3Plus text={'Sprache ' + movieformat.name} icon='list'/>
      <AskModal
          header='Sprache löschen'
          prompt={'Sprache ' + movieformat.name}
          modalOpen={modalOpen}
          onSubmit={handleDelete}
          onClose={closeModal}
      />
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{movieformat.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
   </div>
  );
}

export default MovieformatDetailsPage;