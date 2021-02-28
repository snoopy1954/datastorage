import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { Artist } from '../../../../../../backend/src/types/music';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    onCancel: () => void;
}

export const ArtistDetails: React.FC<Props> = ({ onCancel }) => {
    const artist: Artist  = useSelector((state: RootState) => state.artist);

    return (          
        <div className='App'>
            <AppHeaderH3 text={artist.name} icon='zoom-in'/>
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
                        <Table.Cell>{artist.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{artist.group}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>{artist.id}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Postgres ID</Table.Cell>
                        <Table.Cell>{artist.pgid}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Anzahl CDs</Table.Cell>
                        <Table.Cell>{artist.cdnumber}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{artist.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default ArtistDetails