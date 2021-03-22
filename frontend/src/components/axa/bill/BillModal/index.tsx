import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from '../../../../types/basic';
import { Bill } from '../../../../../../backend/src/types/axa';
import { BillWithFileDatesNoID } from '../../../../types/axa';

import { BillForm } from '../BillForm';
import { BillDetails } from '../BillDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  bill: Bill;
  onClose: () => void;
  onSubmit: (values: BillWithFileDatesNoID) => void;
}

export const BillModal = ({ edittype, title, modalOpen, bill, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BillForm edittype={edittype} bill={bill} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BillDetails bill={bill} onCancel={onClose}/>}
    </Modal.Content>
  </Modal> 
);

export default BillModal;
