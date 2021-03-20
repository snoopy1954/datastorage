import React from "react";
import { Table, Button } from "semantic-ui-react";
import { styleButton, backgroundColor } from '../../../../constants';

import { Movie } from '../../../../../../backend/src/types/movie';

import { AppHeaderH3 } from '../../../basic/header';


interface Props {
    movie: Movie;
    onCancel: () => void;
}
  
export const MovieDetails: React.FC<Props> = ({ movie, onCancel }) => {
    return (          
        <div className="App">
            <AppHeaderH3 text={movie.title.name} icon='zoom-in'/>
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
                        <Table.Cell>{movie.title.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kommentar</Table.Cell>
                        <Table.Cell>{movie.comment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Datei</Table.Cell>
                        <Table.Cell>{movie.filename}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Gruppe</Table.Cell>
                        <Table.Cell>{movie.moviegroup}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Untergruppe</Table.Cell>
                        <Table.Cell>{movie.subgroup}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Format</Table.Cell>
                        <Table.Cell>{movie.format}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
            </Table>
            <Button style={styleButton} onClick={onCancel}>Schliessen</Button>
        </div>
    );
}

export default MovieDetails