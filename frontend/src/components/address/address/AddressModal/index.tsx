import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Address, AddressNoID } from '../../../../../../backend/src/types/address';

import { AddressForm } from '../AddressForm';
import { AddressDetails } from '../AddressDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  address: Address;
  onClose: () => void;
  onSubmit: (values: AddressNoID) => void;
};

export const AddressModal = ({ edittype, title, modalOpen, address, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<AddressForm edittype={edittype} address={address} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<AddressDetails address={address} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default AddressModal;
