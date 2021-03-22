import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Account } from '../../../../../../backend/src/types/axa';
import { AccountWithFileDateNoID } from '../../../../types/axa';

import { AccountForm } from '../AccountForm';
import { AccountDetails } from '../AccountDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  account: Account;
  onClose: () => void;
  onSubmit: (values: AccountWithFileDateNoID) => void;
}

export const AccountModal = ({ edittype, title, modalOpen, account, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AccountForm edittype={edittype} account={account} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<AccountDetails account={account} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default AccountModal;
