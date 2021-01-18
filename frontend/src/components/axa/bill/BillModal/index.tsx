import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from '../../../../types/basic';
import { BillWithFileDatesNoID } from '../../../../types/axa';

import { BillForm } from '../BillForm';
import { BillDetails } from '../BillDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BillWithFileDatesNoID) => void;
}

export const BillModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BillForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BillDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal> 
);

export default BillModal;
