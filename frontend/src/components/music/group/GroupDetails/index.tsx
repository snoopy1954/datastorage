import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
  onCancel: () => void;
}

export const GroupDetails: React.FC<Props> = ({ onCancel }) => {
  const group = useSelector((state: RootState) => state.musicgroup);      

  return (
    <div className="App">
      <AppHeaderH3 text={group.name} icon='zoom-in'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }}>Parametername</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }}>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{group.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Reihenfolge</Table.Cell>
            <Table.Cell>{group.seqnr}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
    </div>
  );
}

export default GroupDetails;