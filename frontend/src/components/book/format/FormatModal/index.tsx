import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Format, FormatNoID } from '../../../../../../backend/src/types/book';

import { FormatForm } from '../FormatForm';
import { FormatDetails } from '../FormatDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  format: Format;
  onClose: () => void;
  onSubmit: (values: FormatNoID) => void;
}

export const FormatModal = ({ edittype, title, modalOpen, format, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<FormatForm edittype={edittype} format={format} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<FormatDetails format={format} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default FormatModal;
