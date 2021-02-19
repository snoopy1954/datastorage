import React from 'react';
import { Modal } from 'semantic-ui-react';
import { ActivityNoID } from '../../../../../../backend/src/types/sport';

import { Edittype } from '../../../../types/basic';

import { ActivityForm } from '../ActivityForm';
import { ActivityDetails } from '../ActivityDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ActivityNoID) => void;
}

export const ActivityModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<ActivityForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<ActivityDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default ActivityModal;
