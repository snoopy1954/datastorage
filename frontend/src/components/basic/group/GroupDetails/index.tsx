import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Group } from '../../../../../../backend/src/types/basic';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
  group: Group;
  onCancel: () => void;
}

export const GroupDetails: React.FC<Props> = ({ group, onCancel }) => {
  const subgroups: string[] = Object.values(group.subgroups);

  return (
    <div className="App">
      <AppHeaderH3 text={group.name} icon='zoom-in'/>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parametername</Table.HeaderCell>
            <Table.HeaderCell>Wert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Gruppe</Table.Cell>
            <Table.Cell>{group.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Untergruppen</Table.Cell>
            <Table.Cell>
              {subgroups!==[]&&subgroups.map((subgroup: string) => (
                <Table.Row key={subgroup} >
                  <Table.Cell>{subgroup}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Cell>
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