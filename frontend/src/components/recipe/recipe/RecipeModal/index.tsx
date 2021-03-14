import React from 'react';
import { Modal } from 'semantic-ui-react';

import { RecipeWithContentNoID } from '../../../../types/recipe';
import { Recipe } from '../../../../../../backend/src/types/recipe';
import { Edittype } from '../../../../types/basic';

import { RecipeForm } from '../RecipeForm';
import { RecipeDetails } from '../RecipeDetails';


interface Props {
  edittype: Edittype;
  title: string;
  modalOpen: boolean;
  recipe: Recipe;
  onClose: () => void;
  onSubmit: (values: RecipeWithContentNoID) => void;
}

export const RecipeModal = ({ edittype, title, modalOpen, recipe, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {edittype!==Edittype.SHOW&&<Modal.Header>{title}</Modal.Header>}
    <Modal.Content>
      {edittype!==Edittype.SHOW&&<RecipeForm edittype={edittype} recipe={recipe} onSubmit={onSubmit} onCancel={onClose}/>}
      {edittype===Edittype.SHOW&&<RecipeDetails recipe={recipe} onCancel={onClose}/>}
    </Modal.Content>
  </Modal>
);

export default RecipeModal;
