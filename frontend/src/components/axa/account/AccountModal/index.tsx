import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { AccountWithFileDateNoID } from '../../../../types/axa';

import { AccountForm } from '../AccountForm';
import { AccountDetails } from '../AccountDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AccountWithFileDateNoID) => void;
}

export const AccountModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AccountForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<AccountDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default AccountModal;
