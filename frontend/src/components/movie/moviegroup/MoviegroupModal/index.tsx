import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { MoviegroupNoID } from '../../../../../../backend/src/types/movie';

import { MoviegroupForm } from '../MoviegroupForm';
import { MoviegroupDetails } from '../MoviegroupDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MoviegroupNoID) => void;
}

export const MoviegroupModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<MoviegroupForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<MoviegroupDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default MoviegroupModal;
