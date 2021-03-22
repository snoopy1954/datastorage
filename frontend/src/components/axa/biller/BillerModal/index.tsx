import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Biller, BillerNoID } from '../../../../../../backend/src/types/axa';

import BillerForm from '../BillerForm';
import BillerDetails from '../BillerDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  biller: Biller;
  onClose: () => void;
  onSubmit: (values: BillerNoID) => void;
}

export const BillerModal = ({ edittype, title, modalOpen, biller, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<BillerForm edittype={edittype} biller={biller} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<BillerDetails biller={biller} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default BillerModal;
