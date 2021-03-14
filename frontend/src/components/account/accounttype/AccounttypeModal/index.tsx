import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Accounttype, AccounttypeNoID } from '../../../../../../backend/src/types/account';

import { AccounttypeForm } from '../AccounttypeForm';
import { AccounttypeDetails } from '../AccounttypeDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  accounttype: Accounttype,
  onClose: () => void;
  onSubmit: (values: AccounttypeNoID) => void;
}

export const AccounttypeModal = ({ edittype, title, modalOpen, accounttype, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AccounttypeForm edittype={edittype} accounttype={accounttype} onSubmit={onSubmit} onCancel={onClose} />}
      {edittype===Edittype.SHOW&&<AccounttypeDetails accounttype={accounttype} onCancel={onClose} />}
    </Modal.Content>
  </Modal>
);

export default AccounttypeModal;
