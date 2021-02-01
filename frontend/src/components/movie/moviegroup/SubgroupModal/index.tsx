import React from 'react';
import { Modal } from 'semantic-ui-react';
import { SubgroupForm, Value } from '../SubgroupForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Value) => void;
}

export const SubgroupModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neue Untergruppe anlegen</Modal.Header>
    <Modal.Content>
      <SubgroupForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default SubgroupModal;