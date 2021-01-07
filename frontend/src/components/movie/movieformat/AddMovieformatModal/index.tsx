import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddMovieformatForm } from './AddMovieformatForm';
import { MovieformatNoID } from '../../../../../../backend/src/types/movie';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MovieformatNoID) => void;
  error?: string;
}

export const AddMovieformatModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Format anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddMovieformatForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddMovieformatModal;
