import React from 'react';
import { Modal } from 'semantic-ui-react';
import { BookWithContentNoID } from '../../../../types/book';

import { Edittype } from "../../../../types/basic";

import { BookForm } from '../BookForm';
import { BookDetails } from '../BookDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BookWithContentNoID) => void;
}

export const BookModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BookForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BookDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default BookModal;
