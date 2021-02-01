import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { AccountyearNoID } from '../../../../../../backend/src/types/account';

import { AccountyearForm } from '../AccountyearForm';
import { AccountyearDetails } from '../AccountyearDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AccountyearNoID) => void;
}

export const AccountyearModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AccountyearForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<AccountyearDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default AccountyearModal;
