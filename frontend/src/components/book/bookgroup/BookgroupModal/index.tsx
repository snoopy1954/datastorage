import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { BookgroupNoID } from '../../../../../../backend/src/types/book';

import { BookgroupForm } from '../BookgroupForm';
import { BookgroupDetails } from '../BookgroupDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BookgroupNoID) => void;
}

export const BookgroupModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BookgroupForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BookgroupDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default BookgroupModal;
