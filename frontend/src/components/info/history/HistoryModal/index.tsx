import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Historyline, HistorylineNoID } from '../../../../../../backend/src/types/logging';

import { HistorylineForm } from '../HistoryForm';
import { HistorylineDetails } from '../HistoryDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  historyline: Historyline;
  onClose: () => void;
  onSubmit: (values: HistorylineNoID) => void;
}

export const HistoryModal = ({ edittype, title, modalOpen, historyline, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<HistorylineForm edittype={edittype} historyline={historyline} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<HistorylineDetails historyline={historyline} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default HistoryModal;
