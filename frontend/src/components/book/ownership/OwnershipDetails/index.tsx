import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Ownership } from '../../../../../../backend/src/types/book';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  ownership: Ownership;
  onCancel: () => void;
}

export const OwnershipDetails: React.FC<Props> = ({ ownership, onCancel }) => {
  return (
    <div className="App">
      <AppHeaderH3 text={'Sprache ' + ownership.name} icon='list'/>
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
            <Table.Cell>{ownership.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default OwnershipDetails;