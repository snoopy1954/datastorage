import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { DeviceNoID } from '../../../../../../backend/src/types/network';

import { DeviceForm } from '../DeviceForm';
import { DeviceDetails } from '../DeviceDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DeviceNoID) => void;
}

export const DeviceModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<DeviceForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<DeviceDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default DeviceModal;
