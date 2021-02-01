import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { update } from '../../../../services/movie/moviegroups';

import { Moviegroup } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { SubgroupModal } from '../SubgroupModal';
import { Value } from '../SubgroupForm';


interface Props {
  onCancel: () => void;
}

export const MoviegroupDetails: React.FC<Props> = ({ onCancel }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const moviegroup = useSelector((state: RootState) => state.moviegroup);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const actionAdd = async (values: Value) => {
    if (moviegroup) {
      const newMoviegroup: Moviegroup = moviegroup;
      newMoviegroup.subgroups.push(values.value);
      update(moviegroup.id, newMoviegroup);
    }
    closeModal();
  };

  const subgroups: string[] = Object.values(moviegroup.subgroups);

  return (
    <div className="App">
      <SubgroupModal
        modalOpen={modalOpen}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AppHeaderH3 text={moviegroup.name} icon='zoom-in'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
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
      <Button style={styleButton} onClick={openModal}>+U.Gruppe</Button>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
    </div>
  );
}

export default MoviegroupDetails;