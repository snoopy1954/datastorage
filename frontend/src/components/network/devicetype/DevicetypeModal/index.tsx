import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Devicetype, DevicetypeNoID } from '../../../../../../backend/src/types/network';

import { DevicetypeForm } from '../DevicetypeForm';
import { DevicetypeDetails } from '../DevicetypeDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  devicetype: Devicetype;
  onClose: () => void;
  onSubmit: (values: DevicetypeNoID) => void;
};

export const DevicetypeModal = ({ edittype, title, modalOpen, devicetype, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<DevicetypeForm edittype={edittype} devicetype={devicetype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<DevicetypeDetails devicetype={devicetype} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default DevicetypeModal;
