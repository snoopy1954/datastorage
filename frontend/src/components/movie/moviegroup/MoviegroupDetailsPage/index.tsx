import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from '../../../../constants';

import { update } from '../../../../services/movie/moviegroups';

import { Moviegroup } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { clearSelectedMoviegroup } from '../../../../state/movie/selectedmoviegroup/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AppMenu, Item }  from '../../../basic/menu';
import { AddSubgroupModal } from '../AddSubgroupModal';
import { Value } from '../AddSubgroupModal/AddSubgroupForm';


export const MoviegroupDetailsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const moviegroup = useSelector((state: RootState) => state.moviegroup);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const handleNewSubgroup = async (values: Value) => {
    if (moviegroup) {
      const newMoviegroup: Moviegroup = moviegroup;
      newMoviegroup.subgroups.push(values.value);
      update(moviegroup.id, newMoviegroup);
    }
    closeModal();
  };

  const handleClose = () => {
    dispatch(clearSelectedMoviegroup());
  }

  if (moviegroup.id==='') {
    return (
      <div>
        war wohl nix
      </div>
    );
  }

  const buttons: Item[] = 
  [
    {
      name: 'Neu',
      title: 'Neu',
      color: 'blue',
      onClick: openModal
    },
    {
      name: 'Schliessen',
      title: 'Schliessen',
      color: 'blue',
      onClick: handleClose
    },
  ];

  const subgroups: string[] = Object.values(moviegroup.subgroups);

  return (
    <div className="App">
      <AppHeaderH3 text={moviegroup.name}/>
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Untergruppen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {subgroups!==[]&&subgroups.map((subgroup: string) => (
            <Table.Row key={subgroup} >
              <Table.Cell>{subgroup}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddSubgroupModal
        modalOpen={modalOpen}
        onSubmit={handleNewSubgroup}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
}

export default MoviegroupDetailsPage;