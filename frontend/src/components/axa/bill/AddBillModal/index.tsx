import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddBillForm from './AddBillForm';
import { Edittype } from "../../../../types/basic";
import { BillWithFileDatesNoID } from '../../../../../../backend/src/types/axa';

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BillWithFileDatesNoID) => void;
  error?: string;
}

export const AddBillModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Rechnung anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddBillForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddBillModal;
