import React from 'react';
import { Modal } from 'semantic-ui-react';

import { HistorylineNoID } from '../../../../../../backend/src/types/logging';

import { HistorylineForm } from '../HistoryForm';


interface Props {
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HistorylineNoID) => void;
}

export const HistoryModal = ({ title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <HistorylineForm onSubmit={onSubmit} onCancel={onClose}/>
    </Modal.Content>
  </Modal>
);

export default HistoryModal;
