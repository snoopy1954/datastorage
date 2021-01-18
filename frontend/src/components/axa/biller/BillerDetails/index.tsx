import React from "react";
import { useSelector } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Biller } from '../../../../../../backend/src/types/axa';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from "../../../basic/header";


interface Props {
  onCancel: () => void;
};

export const BillerDetails: React.FC<Props> = ({ onCancel }) => {
  const biller: Biller = useSelector((state: RootState) => state.biller);

  return (
    <div className="App">
      <AppHeaderH3 text={'Rechnungssteller ' + biller.name.name} icon='list'/>
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
            <Table.Cell>{biller.name.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Person</Table.Cell>
            <Table.Cell>{biller.person}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default BillerDetails;