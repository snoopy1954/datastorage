import React from 'react';
import { Modal } from 'semantic-ui-react';
import { Cd, CdNoID } from '../../../../../../backend/src/types/music';

import { Edittype } from '../../../../types/basic';

import { CdForm } from '../CdForm';
import { CdDetails } from '../CdDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  cd: Cd;
  onClose: () => void;
  onSubmit: (values: CdNoID) => void;
}

export const CdModal = ({ edittype, title, modalOpen, cd, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<CdForm edittype={edittype} cd={cd} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<CdDetails cd={cd} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default CdModal;
