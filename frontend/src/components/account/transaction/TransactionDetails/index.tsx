import React from "react";
import { useSelector } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { RootState } from '../../../../state/store';
       
import { AppHeaderH3 } from "../../../basic/header";

import { getAmount, getFormatedDate } from '../../../../utils/basic';


interface Props {
    onCancel: () => void;
}

export const TransactionDetails: React.FC<Props> = ({ onCancel }) => {
    const transaction = useSelector((state: RootState) => state.transaction);

    return (          
        <div className="App">
            <AppHeaderH3 text={transaction.name} icon='zoom-in'/>
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Parametername</Table.HeaderCell>
                        <Table.HeaderCell>Wert</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Titel</Table.Cell>
                        <Table.Cell>{transaction.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{transaction.seqnr}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Konto</Table.Cell>
                        <Table.Cell>{transaction.accounttype}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jahr</Table.Cell>
                        <Table.Cell>{transaction.year}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Datum</Table.Cell>
                        <Table.Cell>{getFormatedDate(transaction.date)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Buchungstext</Table.Cell>
                        <Table.Cell>{transaction.text}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Grund</Table.Cell>
                        <Table.Cell>{transaction.purpose}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Person</Table.Cell>
                        <Table.Cell>{transaction.person}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>IBAN</Table.Cell>
                        <Table.Cell>{transaction.iban}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>BIC</Table.Cell>
                        <Table.Cell>{transaction.bic}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Betrag</Table.Cell>
                        <Table.Cell>{getAmount(transaction.value)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Währung</Table.Cell>
                        <Table.Cell>{transaction.currency}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Info</Table.Cell>
                        <Table.Cell>{transaction.info}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kontostand</Table.Cell>
                        <Table.Cell>{getAmount(transaction.balance)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Checksum</Table.Cell>
                        <Table.Cell>{transaction.checksum}</Table.Cell>
                    </Table.Row>
                 </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default TransactionDetails