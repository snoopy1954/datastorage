import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { update } from '../../../../services/document/groups';

import { Group } from '../../../../../../backend/src/types/basic';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';
import { AskString, Value } from '../../../basic/askString';


interface Props {
  onCancel: () => void;
}

export const GroupDetails: React.FC<Props> = ({ onCancel }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const documentgroup = useSelector((state: RootState) => state.documentgroup);      

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const actionAdd = async (values: Value) => {
    if (documentgroup) {
      const newGroup: Group = documentgroup;
      newGroup.subgroups.push(values.value);
      update(documentgroup.id, newGroup);
    }
    closeModal();
  };

  const subgroups: string[] = Object.values(documentgroup.subgroups);

  return (
    <div className="App">
      <AskString
        header='Neue Dokumentgruppe anlegen'
        prompt='Dokumentgruppe eingeben'
        modalOpen={modalOpen}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <AppHeaderH3 text={documentgroup.name} icon='zoom-in'/>
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

export default GroupDetails;