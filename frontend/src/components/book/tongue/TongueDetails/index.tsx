import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  onCancel: () => void;
}

export const TongueDetails: React.FC<Props> = ({ onCancel }) => {
  const tongue = useSelector((state: RootState) => state.tongue);

  return (
    <div className="App">
      <AppHeaderH3 text={'Sprache ' + tongue.name} icon='list'/>
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
            <Table.Cell>{tongue.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default TongueDetails;