import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddBookForm from './AddBookForm';
import { Edittype } from "../../../../types/basic";
import { BookWithFileNoID } from '../../../../../../backend/src/types/book';

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BookWithFileNoID) => void;
  error?: string;
}

const AddBookModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Buch anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddBookForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddBookModal;
