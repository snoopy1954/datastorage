import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddYearForm from './AddYearForm';
import { YearNoID, Year } from '../../../../../../backend/src/types/axa';

interface Props {
  years: Year[];
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: YearNoID) => void;
  error?: string;
}

const AddYearModal = ({ years, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Jahr anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddYearForm years={years} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddYearModal;
