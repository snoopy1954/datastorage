import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddBookgroupForm from './AddBookgroupForm';
import { BookgroupNoID } from "../../../../types/book";


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BookgroupNoID) => void;
  error?: string;
}

const AddBookgroupModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Gruppe anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddBookgroupForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddBookgroupModal;
