import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddSubgroupForm, Value } from './AddSubgroupForm';



interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Value) => void;
  error?: string;
}

export const AddSubgroupModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Untergruppe anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddSubgroupForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddSubgroupModal;
