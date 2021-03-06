import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Year } from '../../../../../../backend/src/types/pressure';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  year: Year;
  onCancel: () => void;
}

export const YearDetails: React.FC<Props> = ({ year, onCancel }) => {
  return (
    <div className="App">
      <AppHeaderH3 text={'Jahr ' + year.name.name} icon='list'/>
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
            <Table.Cell>{year.name.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>letzter Monat</Table.Cell>
            <Table.Cell>{year.lastMonth}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>letztes Jahr</Table.Cell>
            <Table.Cell>{year.isLastYear ? 'ja' : 'nein'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default YearDetails;