import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
  onCancel: () => void;
}

export const AccounttypeDetails: React.FC<Props> = ({ onCancel }) => {
  const accounttype = useSelector((state: RootState) => state.accounttype);

  return (
    <div className="App">
      <AppHeaderH3 text={'Format ' + accounttype.name} icon='list'/>
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
            <Table.Cell>{accounttype.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>IBAN</Table.Cell>
            <Table.Cell>{accounttype.iban}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>BIC</Table.Cell>
            <Table.Cell>{accounttype.bic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Kontonummer</Table.Cell>
            <Table.Cell>{accounttype.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Kontostand</Table.Cell>
            <Table.Cell>{accounttype.balance}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Kommentar</Table.Cell>
            <Table.Cell>{accounttype.comment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Reihenfolge</Table.Cell>
            <Table.Cell>{accounttype.seqnr}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
   </div>
  );
}

export default AccounttypeDetails;