import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddTongueForm from './AddTongueForm';
import { TongueNoID } from '../../../../../../backend/src/types/book';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TongueNoID) => void;
  error?: string;
}

const AddTongueModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Sprache anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddTongueForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddTongueModal;
