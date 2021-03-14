import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Activity, ActivityNoID } from '../../../../../../backend/src/types/sport';
import { Edittype } from '../../../../types/basic';

import { ActivityForm } from '../ActivityForm';
import { ActivityDetails } from '../ActivityDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  activity: Activity;
  onClose: () => void;
  onSubmit: (values: ActivityNoID) => void;
}

export const ActivityModal = ({ edittype, title, modalOpen, activity, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<ActivityForm edittype={edittype} activity={activity} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<ActivityDetails activity={activity} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default ActivityModal;
