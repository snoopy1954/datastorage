import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Movieformat, MovieformatNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { addMovieformat, updateMovieformat, removeMovieformat } from '../../../../state/movie/movieformatlist/actions';
import { setSelectedMovieformat, clearSelectedMovieformat } from '../../../../state/movie/selectedmovieformat/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { MovieformatModal } from '../MovieformatModal';


export const MovieformatPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const movieformats = useSelector((state: RootState) => state.movieformats);      
  const movieformat = useSelector((state: RootState) => state.movieformat);      

  const openModalNew = (): void => setModalOpen([true, false, false, false]);

  const openModalDelete = async (account: Movieformat): Promise<void> => {
    dispatch(setSelectedMovieformat(account));
    setModalOpen([false, true, false, false]);
  };
      
  const openModalChange = async (account: Movieformat): Promise<void> => {
    dispatch(setSelectedMovieformat(account));
    setModalOpen([false, false, true, false]);
  };
  
  const openModalShow = async (account: Movieformat): Promise<void> => {
    dispatch(setSelectedMovieformat(account));
    setModalOpen([false, false, false, true]);
  };
  
  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
  };
    
  const closeModal = (): void => {
    setModalOpen([false, false, false, false]);
  };

  const actionAdd = async (values: MovieformatNoID) => {
    dispatch(addMovieformat(values));
    closeModal();
  };

  const actionShow = () => {
    dispatch(clearSelectedMovieformat());
    closeModal();
  };

  const actionChange = async (values: MovieformatNoID) => {
    const formatToChange: Movieformat = {
      ...values,
      id: movieformat.id
    };
    dispatch(updateMovieformat(formatToChange));
    dispatch(clearSelectedMovieformat());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeMovieformat(movieformat.id));
    dispatch(clearSelectedMovieformat());
    closeModal();
  };  
  
  return (
    <div className="App">
      <MovieformatModal
        edittype={Edittype.ADD}
        title='Neues Format anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <MovieformatModal
        edittype={Edittype.SHOW}
        title={'Format ' + movieformat.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <MovieformatModal
        edittype={Edittype.EDIT}
        title={'Format ' + movieformat.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Format löschen'
        prompt={'Format ' + movieformat.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Formate' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='ten wide center aligned' style={{ backgroundColor}} >Name</Table.HeaderCell>
            <Table.HeaderCell className='four wide center aligned' style={{ backgroundColor}} >Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(movieformats).map((movieformat: Movieformat) => (
            <Table.Row key={movieformat.id}>
              <Table.Cell>{movieformat.name}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(movieformat)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(movieformat)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(movieformat)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MovieformatPage;