import React from 'react';
import { Modal } from 'semantic-ui-react';
import { TransactionNoID } from '../../../../../../backend/src/types/account';

import { Edittype } from "../../../../types/basic";

import { TransactionForm } from '../TransactionForm';
import { TransactionDetails } from '../TransactionDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TransactionNoID) => void;
}

export const TransactionModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<TransactionForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<TransactionDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default TransactionModal;
