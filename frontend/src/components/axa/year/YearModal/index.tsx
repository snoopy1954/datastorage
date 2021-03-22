import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { Year, YearNoID } from '../../../../../../backend/src/types/axa';

import { YearForm } from '../YearForm';
import { YearDetails } from '../YearDetails';


interface Props {
  edittype: Edittype; 
  title: string;
  modalOpen: boolean;
  year: Year;
  onClose: () => void;
  onSubmit: (values: YearNoID) => void;
}

export const YearModal = ({ edittype, title, modalOpen, year, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<YearForm edittype={edittype} year={year} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<YearDetails year={year} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default YearModal;
