import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddInvoicingpartyForm from './AddInvoicingpartyForm';
import { InvoicingPartyNoID } from '../../../../../../backend/src/types/axa';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: InvoicingPartyNoID) => void;
  error?: string;
}

const AddInvoicingpartyModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neuen Rechnungssteller anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddInvoicingpartyForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddInvoicingpartyModal;
