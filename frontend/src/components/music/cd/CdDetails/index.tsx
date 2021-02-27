import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { styleButton, backgroundColor } from '../../../../constants';

import { Cd, Artist, Track } from '../../../../../../backend/src/types/music';

import { RootState } from '../../../../state/store';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    onCancel: () => void;
}

export const CdDetails: React.FC<Props> = ({ onCancel }) => {
    const artists: Artist[] = useSelector((state: RootState) => state.artists);
    const cd: Cd  = useSelector((state: RootState) => state.cd);

    const artist: Artist = Object.values(artists).filter(artist => artist.id===cd.artistident)[0];

    return (          
        <div className='App'>
            <AppHeaderH3 text={cd.name} icon='zoom-in'/>
            <Table celled style={{ backgroundColor }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Parametername</Table.HeaderCell>
                        <Table.HeaderCell>Wert</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Artist</Table.Cell>
                        <Table.Cell>{artist.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Titel</Table.Cell>
                        <Table.Cell>{cd.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Reihenfolge</Table.Cell>
                        <Table.Cell>{cd.seqnr}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default CdDetails