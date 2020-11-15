import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddAccountForm from './AddAccountForm';
import { Edittype } from "../../../../types/basic";
import { AccountNoID } from '../../../../../../backend/src/types/axa';

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AccountNoID) => void;
  error?: string;
}

const AddAccountModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neuen Abrechnung anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddAccountForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddAccountModal;
