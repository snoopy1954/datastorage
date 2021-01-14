import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Version } from '../../../../../../backend/src/types/network';

import { VersionForm } from '../VersionForm';


interface Props {
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Version) => void;
}

export const VersionModal = ({ title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <VersionForm onSubmit={onSubmit} onCancel={onClose}/>
    </Modal.Content>
  </Modal>
);

export default VersionModal;
