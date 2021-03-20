import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Movie, MovieNoID } from '../../../../../../backend/src/types/movie';

import { MovieForm } from '../MovieForm';
import { MovieDetails } from '../MovieDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  movie: Movie;
  onClose: () => void;
  onSubmit: (values: MovieNoID) => void;
}

export const MovieModal = ({ edittype, title, modalOpen, movie, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<MovieForm edittype={edittype} movie={movie} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<MovieDetails movie={movie} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default MovieModal;
