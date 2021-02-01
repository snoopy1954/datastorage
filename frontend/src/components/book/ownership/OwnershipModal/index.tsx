import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { OwnershipNoID } from '../../../../../../backend/src/types/book';

import { OwnershipForm } from '../OwnershipForm';
import { OwnershipDetails } from '../OwnershipDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OwnershipNoID) => void;
}

export const OwnershipModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<OwnershipForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<OwnershipDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default OwnershipModal;
