import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { GroupNoID } from '../../../../../../backend/src/types/basic';

import { RecipegroupForm } from '../RecipegroupForm';
import { RecipegroupDetails } from '../RecipegroupDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: GroupNoID) => void;
}

export const RecipegroupModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<RecipegroupForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<RecipegroupDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default RecipegroupModal;
