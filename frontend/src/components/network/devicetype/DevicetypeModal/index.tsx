import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { DevicetypeNoID } from '../../../../../../backend/src/types/network';

import { DevicetypeForm } from '../DevicetypeForm';
import { DevicetypeDetails } from '../DevicetypeDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DevicetypeNoID) => void;
};

export const DevicetypeModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<DevicetypeForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<DevicetypeDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default DevicetypeModal;
