import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { AccounttypeNoID } from '../../../../../../backend/src/types/account';

import { AccounttypeForm } from '../AccounttypeForm';
import { AccounttypeDetails } from '../AccounttypeDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AccounttypeNoID) => void;
}

export const AccounttypeModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AccounttypeForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />}
      {edittype===Edittype.SHOW&&<AccounttypeDetails onCancel={onClose} />}
    </Modal.Content>
  </Modal>
);

export default AccounttypeModal;
