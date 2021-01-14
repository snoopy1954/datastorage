import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { OsNoID } from '../../../../../../backend/src/types/network';

import { OsForm } from '../OsForm';
import { OsDetails } from '../OsDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OsNoID) => void;
}

export const OsModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
    {edittype!==Edittype.SHOW&&<OsForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
    {edittype===Edittype.SHOW&&<OsDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default OsModal;
