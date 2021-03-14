import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { BookWithContentNoID } from '../../../../types/book';
import { Book } from '../../../../../../backend/src/types/book';

import { BookForm } from '../BookForm';
import { BookDetails } from '../BookDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  book: Book;
  onClose: () => void;
  onSubmit: (values: BookWithContentNoID) => void;
}

export const BookModal = ({ edittype, title, modalOpen, book, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BookForm edittype={edittype} book={book} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BookDetails book={book} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default BookModal;
