import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddMovieForm } from './AddMovieForm';
import { Edittype } from "../../../../types/basic";
import { MovieNoID } from '../../../../../../backend/src/types/movie';

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MovieNoID) => void;
  error?: string;
}

export const AddMovieModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neuen Film anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddMovieForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddMovieModal;
