import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Month } from '../../../../../../backend/src/types/pressure';

import { MonthDetails } from '../MonthDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Month) => void;
}

export const MonthModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Content>
      <MonthDetails edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>
    </Modal.Content>
  </Modal>
);

export default MonthModal;
