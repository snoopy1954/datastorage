import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { Activity } from '../../../../../../backend/src/types/sport';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    activity: Activity;
    onCancel: () => void;
}

export const ActivityDetails: React.FC<Props> = ({ activity, onCancel }) => {
    return (          
        <div className='App'>
            <AppHeaderH3 text={activity.name} icon='zoom-in'/>
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
                        <Table.Cell>{activity.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{activity.group}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Dauer</Table.Cell>
                        <Table.Cell>{activity.duration}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Entfernung</Table.Cell>
                        <Table.Cell>{activity.distance}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Schritte</Table.Cell>
                        <Table.Cell>{activity.steps}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jahr</Table.Cell>
                        <Table.Cell>{activity.year}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Datum</Table.Cell>
                        <Table.Cell>{activity.date}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kommentar</Table.Cell>
                        <Table.Cell>{activity.comment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{activity.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default ActivityDetails