import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Group, GroupNoID } from '../../../../../../backend/src/types/basic';

import { GroupForm } from '../GroupForm';
import { GroupDetails } from '../GroupDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  group: Group;
  onClose: () => void;
  onSubmit: (values: GroupNoID) => void;
}

export const GroupModal = ({ edittype, title, modalOpen, group, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<GroupForm edittype={edittype} group={group} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<GroupDetails group={group} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default GroupModal;
