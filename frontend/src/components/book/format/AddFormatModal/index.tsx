import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddFormatForm from './AddFormatForm';
import { FormatNoID } from '../../../../../../backend/src/types/book';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormatNoID) => void;
  error?: string;
}

const AddFormatModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Format anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddFormatForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddFormatModal;
