import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { AddressNoID } from '../../../../../../backend/src/types/address';

import { AddressForm } from '../AddressForm';
import { AddressDetails } from '../AddressDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddressNoID) => void;
};

export const AddressModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AddressForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<AddressDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default AddressModal;
