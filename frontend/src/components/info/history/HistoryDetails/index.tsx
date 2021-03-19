import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Historyline } from '../../../../../../backend/src/types/logging';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    historyline: Historyline;
    onCancel: () => void;
}
  
export const HistorylineDetails: React.FC<Props> = ({ historyline, onCancel }) => {
    return (          
        <div className="App">
            <AppHeaderH3 text={historyline.date.name} icon='zoom-in'/>
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Parametername</Table.HeaderCell>
                        <Table.HeaderCell>Wert</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Datum</Table.Cell>
                        <Table.Cell>{historyline.date.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Version</Table.Cell>
                        <Table.Cell>{historyline.version}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Text</Table.Cell>
                        <Table.Cell>{historyline.text}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{historyline.date.seqnr}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default HistorylineDetails