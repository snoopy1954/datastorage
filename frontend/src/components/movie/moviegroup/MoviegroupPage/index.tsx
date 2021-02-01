import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from "semantic-ui-react";
import { backgroundColor, styleButton } from '../../../../constants';

import { Edittype } from "../../../../types/basic";
import { Moviegroup, MoviegroupNoID } from '../../../../../../backend/src/types/movie';

import { RootState } from '../../../../state/store';
import { addMoviegroup, updateMoviegroup, removeMoviegroup } from '../../../../state/movie/moviegrouplist/actions';
import { setSelectedMoviegroup, clearSelectedMoviegroup } from '../../../../state/movie/selectedmoviegroup/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from "../../../basic/askModal";
import { MoviegroupModal } from '../MoviegroupModal';


export const MoviegroupPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const moviegroups = useSelector((state: RootState) => state.moviegroups);      
  const moviegroup = useSelector((state: RootState) => state.moviegroup);      

  const openModalNew = (): void => {
    setModalOpen([true, false, false, false]);
  };
  
  const openModalDelete = (moviegroup: Moviegroup): void => {
    dispatch(setSelectedMoviegroup(moviegroup));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (moviegroup: Moviegroup): void => {
    dispatch(setSelectedMoviegroup(moviegroup));
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (moviegroup: Moviegroup): void => {
    dispatch(setSelectedMoviegroup(moviegroup));
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
  
  const actionAdd = async (values: MoviegroupNoID) => {
    dispatch(addMoviegroup(values));
    closeModal();
  };
          
  const actionShow = () => {
    dispatch(clearSelectedMoviegroup());
    closeModal();
  };  
  
  const actionChange = async (values: MoviegroupNoID) => {
    const moviegroupToChange: Moviegroup = {
      ...values,
      id: moviegroup.id
    };
    dispatch(updateMoviegroup(moviegroupToChange));
    dispatch(clearSelectedMoviegroup());
    closeModal();
  };
  
  const actionDelete = () => {
    dispatch(removeMoviegroup(moviegroup.id));
    dispatch(clearSelectedMoviegroup());
    closeModal();
  };  

  return (
    <div className="App">
      <MoviegroupModal
        edittype={Edittype.ADD}
        title='Neue Gruppe anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <MoviegroupModal
        edittype={Edittype.SHOW}
        title={'Gruppe ' + moviegroup.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <MoviegroupModal
        edittype={Edittype.EDIT}
        title={'Gruppe ' + moviegroup.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Gruppe löschen'
        prompt={'Gruppe ' + moviegroup.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text='Filmgruppen' icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Table celled compact small='true' style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='ten wide center aligned' style={{ backgroundColor}} >Name</Table.HeaderCell>
            <Table.HeaderCell className='four wide center aligned' style={{ backgroundColor}} >Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(moviegroups).map((moviegroup: Moviegroup) => (
            <Table.Row key={moviegroup.id}>
              <Table.Cell>{moviegroup.name}</Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(moviegroup)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(moviegroup)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(moviegroup)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default MoviegroupPage;