import React from "react";
import { useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  onCancel: () => void;
};

export const DevicetypeDetails: React.FC<Props> = ({ onCancel }) => {
  const devicetype = useSelector((state: RootState) => state.devicetype);      

  return (
    <div className="App">
      <AppHeaderH3 text={'Gerätetyp ' + devicetype.name} icon='zoom-in'/>
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
            <Table.Cell>{devicetype.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Beschreibung</Table.Cell>
            <Table.Cell>{devicetype.description}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br></br>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default DevicetypeDetails;