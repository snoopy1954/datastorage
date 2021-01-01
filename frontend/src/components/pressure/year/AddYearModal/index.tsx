import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddYearForm } from './AddYearForm';
import { Edittype } from "../../../../types/basic";
import { YearNoID } from '../../../../../../backend/src/types/pressure';

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: YearNoID) => void;
  error?: string;
}

export const AddYearModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Jahr anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddYearForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddYearModal;
