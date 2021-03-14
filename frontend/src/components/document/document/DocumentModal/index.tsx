import React from 'react';
import { Modal } from 'semantic-ui-react';
import { DocumentWithContentsNoID } from '../../../../types/document';

import { Edittype } from '../../../../types/basic';
import { Document } from '../../../../../../backend/src/types/document';

import { DocumentForm } from '../DocumentForm';
import { DocumentDetails } from '../DocumentDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  document: Document;
  onClose: () => void;
  onSubmit: (values: DocumentWithContentsNoID) => void;
}

export const DocumentModal = ({ edittype, document, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<DocumentForm edittype={edittype} document={document} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<DocumentDetails document={document} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default DocumentModal;
