import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddBillerForm from './AddBillerForm';
import { BillerNoID } from '../../../../../../backend/src/types/axa';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BillerNoID) => void;
  error?: string;
}

export const AddBillerModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neuen Rechnungssteller anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddBillerForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddBillerModal;
