import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDeviceForm, { DeviceFormValues } from './AddDeviceForm';
import { Edittype } from "../../../../types/basic";

interface Props {
  edittype: Edittype;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DeviceFormValues) => void;
  error?: string;
}

const AddDeviceModal = ({ edittype, modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Neues Gerät anlegen</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddDeviceForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>
    </Modal.Content>
  </Modal>
);

export default AddDeviceModal;
