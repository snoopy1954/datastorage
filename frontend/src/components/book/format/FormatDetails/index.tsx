import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Format } from '../../../../../../backend/src/types/basic';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  format: Format;
  onCancel: () => void;
}

export const FormatDetails: React.FC<Props> = ({ format, onCancel }) => {
  return (
    <div className="App">
      <AppHeaderH3 text={'Format ' + format.name} icon='list'/>
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
            <Table.Cell>{format.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default FormatDetails;