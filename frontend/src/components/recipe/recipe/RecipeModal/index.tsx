import React from 'react';
import { Modal } from 'semantic-ui-react';
import { RecipeWithFileNoID } from '../../../../types/recipe';

import { Edittype } from '../../../../types/basic';

import { RecipeForm } from '../RecipeForm';
import { RecipeDetails } from '../RecipeDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: RecipeWithFileNoID) => void;
}

export const RecipeModal = ({ edittype, title, modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<RecipeForm edittype={edittype} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<RecipeDetails onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default RecipeModal;
