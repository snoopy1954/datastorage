import React from 'react';
import { Modal } from 'semantic-ui-react';
import { ArtistNoID } from '../../../../../../backend/src/types/music';

import { Edittype } from '../../../../types/basic';

import { ArtistForm } from '../ArtistForm';
import { ArtistDetails } from '../ArtistDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ArtistNoID) => void;
}

export const ArtistModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<ArtistForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<ArtistDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default ArtistModal;
