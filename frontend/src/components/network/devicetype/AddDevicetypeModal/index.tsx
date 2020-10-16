import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDevicetypeForm, { DevicetypeFormValues } from './AddDevicetypeForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DevicetypeFormValues) => void;
  error?: string;
}

const AddDevicetypeModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neuen Gerätetyp anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddDevicetypeForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddDevicetypeModal;
