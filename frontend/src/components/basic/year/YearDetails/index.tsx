import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Year } from '../../../../../../backend/src/types/basic';

import { AppHeaderH3 } from '../../header';


interface Props {
  year: Year;
  onCancel: () => void;
}

export const YearDetails: React.FC<Props> = ({ year, onCancel }) => {
  return (
    <div className="App">
      <AppHeaderH3 text={year.name} icon='zoom-in'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Jahr</Table.Cell>
            <Table.Cell>{year.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Reihenfolge</Table.Cell>
            <Table.Cell>{year.seqnr}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
    </div>
  );
}

export default YearDetails;