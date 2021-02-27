import React from 'react';
import { Modal } from 'semantic-ui-react';
import { CdNoID } from '../../../../../../backend/src/types/music';

import { Edittype } from '../../../../types/basic';

import { CdForm } from '../CdForm';
import { CdDetails } from '../CdDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CdNoID) => void;
}

export const CdModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<CdForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<CdDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default CdModal;
