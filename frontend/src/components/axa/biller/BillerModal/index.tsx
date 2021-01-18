import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { BillerNoID } from '../../../../../../backend/src/types/axa';

import BillerForm from '../BillerForm';
import BillerDetails from '../BillerDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BillerNoID) => void;
}

export const BillerModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BillerForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BillerDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default BillerModal;
