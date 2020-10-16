import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddVersionForm, { VersionFormValues } from './AddVersionForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: VersionFormValues) => void;
  error?: string;
}

const AddVersionModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Version anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddVersionForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddVersionModal;
