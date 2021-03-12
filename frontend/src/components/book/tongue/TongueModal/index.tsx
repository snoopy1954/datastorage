import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Tongue, TongueNoID } from '../../../../../../backend/src/types/book';

import { TongueForm } from '../TongueForm';
import { TongueDetails } from '../TongueDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  tongue: Tongue;
  onClose: () => void;
  onSubmit: (values: TongueNoID) => void;
}

export const TongueModal = ({ edittype, title, modalOpen, tongue, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<TongueForm edittype={edittype} tongue={tongue} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<TongueDetails tongue={tongue} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default TongueModal;
