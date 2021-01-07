import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "semantic-ui-react";
import { backgroundColor, styleMainMenu } from '../../../../constants';

import { Edittype } from '../../../../types/basic';
import { MovieNoID, Movie } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { removeMovie, updateMovie } from '../../../../state/movie/movielist/actions';
import { clearSelectedMovie } from '../../../../state/movie/selectedmovie/actions';

import { AppHeaderH3Plus } from '../../../basic/header';
import { AppMenu, Item } from '../../../basic/menu';
import { AskModal } from '../../../basic/askModal';
import { AddMovieModal } from '../AddMovieModal';


export const MovieDetailsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<[boolean, boolean]>([false, false]);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage = useSelector((state: RootState) => state.page.mainpage);      
    const movie  = useSelector((state: RootState) => state.movie);

    const openModalChange = (): void => setModalOpen([true, false]);
    const openModalDelete = (): void => setModalOpen([false, true]);
    enum ModalDialog {
        CHANGE = 0,
        DELETE = 1,
    }  
    const closeModal = (): void => {
        setModalOpen([false, false]);
        setError(undefined);
    };

    const handleChangedMovie = async (values: MovieNoID) => {
        const movieToUpdate: Movie = {
            ...values,
            id: movie.id
        };
        console.log(movieToUpdate)
        dispatch(updateMovie(movieToUpdate));
        closeModal();
        dispatch(clearSelectedMovie());
        dispatch(setPage({ mainpage, subpage: 'movies' }));
    };    

    const handleClose = () => {
        dispatch(clearSelectedMovie());
    };

    const  handleDelete = async () => {
        if (movie) {
            dispatch(removeMovie(movie.id));
        }
        dispatch(clearSelectedMovie());
        dispatch(setPage({ mainpage, subpage: 'movies' }));
    };

    if (movie===undefined) {
        return (
          <div>
            war wohl nix
          </div>
        );
    }

    const buttons: Item[] = 
    [
      {
        name: 'Schliessen',
        title: 'Schliessen',
        color: 'blue',
        onClick: handleClose
      },
      {
        name: 'Ändern',
        title: 'Ändern',
        color: 'blue',
        onClick: openModalChange
      },
      {
        name: 'Löschen',
        title: 'Löschen',
        color: 'red',
        onClick: openModalDelete
      },
    ];

    return (          
        <div className="App">
            <AppHeaderH3Plus text={movie.title.name} icon='zoom-in'/>
            <AddMovieModal
                edittype={Edittype.EDIT}
                modalOpen={modalOpen[ModalDialog.CHANGE]}
                onSubmit={handleChangedMovie} 
                error={error}
                onClose={closeModal}
            />
            <AskModal
                header='Film löschen'
                prompt={'Film löschen ' + movie.title.name}
                modalOpen={modalOpen[ModalDialog.DELETE]}
                onSubmit={handleDelete}
                onClose={closeModal}
            />
             <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
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
        </div>
    );
}

export default MovieDetailsPage