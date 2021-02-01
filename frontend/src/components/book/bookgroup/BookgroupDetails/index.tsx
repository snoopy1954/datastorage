import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { update } from '../../../../services/book/bookgroups';

import { Bookgroup } from '../../../../../../backend/src/types/book';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { SubgroupModal } from '../SubgroupModal';
import { Value } from '../SubgroupForm';


interface Props {
  onCancel: () => void;
}

export const BookgroupDetails: React.FC<Props> = ({ onCancel }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const bookgroup = useSelector((state: RootState) => state.bookgroup);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const actionAdd = async (values: Value) => {
    if (bookgroup) {
      const newBookgroup: Bookgroup = bookgroup;
      newBookgroup.subgroups.push(values.value);
      update(bookgroup.id, newBookgroup);
    }
    closeModal();
  };

  const subgroups: string[] = Object.values(bookgroup.subgroups);

  return (
    <div className="App">
      <SubgroupModal
        modalOpen={modalOpen}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AppHeaderH3 text={bookgroup.name} icon='zoom-in'/>
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

export default BookgroupDetails;