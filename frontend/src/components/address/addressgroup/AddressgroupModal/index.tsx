import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { AddressgroupNoID } from '../../../../../../backend/src/types/address';

import { AddressgroupForm } from '../AddressgroupForm';
import { AddressgroupDetails } from '../AddressgroupDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddressgroupNoID) => void;
}

export const AddressgroupModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AddressgroupForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<AddressgroupDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default AddressgroupModal;
