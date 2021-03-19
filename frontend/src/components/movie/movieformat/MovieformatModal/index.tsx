import React from 'react';
import { Modal } from 'semantic-ui-react';

import { Edittype } from "../../../../types/basic";
import { FormatNoID } from '../../../../../../backend/src/types/basic';

import { MovieformatForm } from '../MovieformatForm';
import { MovieformatDetails } from '../MovieformatDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormatNoID) => void;
}

export const MovieformatModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<MovieformatForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose} />}
      {edittype===Edittype.SHOW&&<MovieformatDetails onCancel={onClose} />}
    </Modal.Content>
  </Modal>
);

export default MovieformatModal;
