import React from "react";
import { useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Year } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  onCancel: () => void;
};

export const YearDetails: React.FC<Props> = ({ onCancel }) => {
  const year: Year = useSelector((state: RootState) => state.axayear);

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
            <Table.Cell>Z100S</Table.Cell>
            <Table.Cell>{year.z100s}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>VITAL750</Table.Cell>
            <Table.Cell>{year.vital750}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default YearDetails;