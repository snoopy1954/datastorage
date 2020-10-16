import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOwnershipForm from './AddOwnershipForm';
import { OwnershipNoID } from "../../../../types/book";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OwnershipNoID) => void;
  error?: string;
}

const AddOwnershipModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neuen Besitztyp anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOwnershipForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOwnershipModal;
