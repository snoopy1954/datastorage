import React from 'react';
import { Modal } from 'semantic-ui-react';
import { DocumentWithContentsNoID } from '../../../../types/document';

import { Edittype } from '../../../../types/basic';

import { DocumentForm } from '../DocumentForm';
import { DocumentDetails } from '../DocumentDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DocumentWithContentsNoID) => void;
}

export const DocumentModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<DocumentForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<DocumentDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default DocumentModal;
