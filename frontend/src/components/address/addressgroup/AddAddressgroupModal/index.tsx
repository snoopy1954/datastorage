import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

import { AddressgroupNoID } from '../../../../../../backend/src/types/address';

import { AddAddressgroupForm } from './AddAddressgroupForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddressgroupNoID) => void;
  error?: string;
}

export const AddAddressgroupModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Gruppe anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddAddressgroupForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddAddressgroupModal;
