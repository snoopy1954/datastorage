import React from "react";
import { useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  onCancel: () => void;
};

export const OsDetails: React.FC<Props> = ({ onCancel }) => {
  const os = useSelector((state: RootState) => state.selectedos);

  const versions: string[] = Object.values(os.versions);

  return (
    <div className="App">
      <AppHeaderH3 text={os.name} icon='list'/>
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
            <Table.Cell>{os.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Beschreibung</Table.Cell>
            <Table.Cell>{os.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Versionen</Table.Cell>
            <Table.Cell>
              {versions!==[]&&versions.map((version: string) => (
                <p>{version}</p>
              ))}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {versions!==[]&&<br></br>}
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
    </div>
  );
}

export default OsDetails;