import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOsForm from './AddOsForm';
import { OsNoID } from '../../../../../../backend/src/types/network';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OsNoID) => void;
  error?: string;
}

const AddOsModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Betriebssystem anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOsForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOsModal;
