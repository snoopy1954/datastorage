import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddMoviegroupForm from './AddMoviegroupForm';
import { MoviegroupNoID } from '../../../../../../backend/src/types/movie';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MoviegroupNoID) => void;
  error?: string;
}

const AddMoviegroupModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Gruppe anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddMoviegroupForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddMoviegroupModal;
