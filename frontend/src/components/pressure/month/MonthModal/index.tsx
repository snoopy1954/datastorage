import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Month } from '../../../../../../backend/src/types/pressure';

import { MonthDetails } from '../MonthDetails';
import { MonthForm } from '../MonthForm';
import { MonthPrint } from '../MonthPrint';
import { MonthExport } from '../MonthExport';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  month: Month;
  onClose: () => void;
  onSubmit: (values: Month) => void;
}

export const MonthModal = ({ edittype, title, modalOpen, month, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Content>
      {edittype===Edittype.SHOW&&<MonthDetails month={month} onCancel={onClose}/>}
      {edittype===Edittype.PRINT&&<MonthPrint month={month} onCancel={onClose}/>}
      {edittype===Edittype.EXPORT&&<MonthExport month={month} onCancel={onClose}/>}
      {edittype===Edittype.EDIT&&<MonthForm month={month} onSubmit={onSubmit} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default MonthModal;
