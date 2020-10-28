import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddAddressForm from './AddAddressForm';
import { Edittype } from "../../../../types/basic";
import { AddressNoID } from '../../../../../../backend/src/types/address';

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddressNoID) => void;
  error?: string;
}

const AddAddressModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Adresse anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddAddressForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddAddressModal;
