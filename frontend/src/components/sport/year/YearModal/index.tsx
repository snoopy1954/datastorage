import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { YearNoID } from '../../../../../../backend/src/types/basic';

import { YearForm } from '../YearForm';
import { YearDetails } from '../YearDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: YearNoID) => void;
}

export const YearModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<YearForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<YearDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default YearModal;
