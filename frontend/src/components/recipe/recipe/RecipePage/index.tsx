import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Group, Content2 } from '../../../../../../backend/src/types/basic';
import { Recipe, RecipeNoID } from '../../../../../../backend/src/types/recipe';
import { Filter, RecipeWithContentNoID } from '../../../../types/recipe';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { addRecipe, updateRecipe, exchangeRecipes, removeRecipe } from '../../../../state/recipe/recipes/actions';
import { clearPdfUrl } from '../../../../state/axa/pdfUrl/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskString, Value } from '../../../basic/askString';
import { AskModal } from '../../../basic/askModal';
import { RecipeModal } from '../RecipeModal';

import { recipeTitle, recipeFilter, newFilter, emptyRecipe } from '../../../../utils/recipe/recipe';
import { createContent, removeContent, updateContent } from '../../../../utils/basic/content';


export const RecipePage: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>(emptyRecipe());
  const [filter, setFilter] = useState<Filter>(newFilter());
  const [recipesChanged, setRecipesChanged] = useState<Array<Recipe>>([]);
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);

  const dispatch = useDispatch();

  const recipes: Recipe[] = useSelector((state: RootState) => state.recipes);
  const groups: Group[] = useSelector((state: RootState) => state.groups);      

  const openModalNew = (): void => setModalOpen([true, false, false, false, false]);

  const openModalDelete = (recipe: Recipe): void => {
    setRecipe(recipe);
    setModalOpen([false, true, false, false, false]);
  };
      
  const openModalChange = (recipe: Recipe): void => {
    setRecipe(recipe);
    setModalOpen([false, false, true, false, false]);
  };
      
  const openModalShow = (recipe: Recipe): void => {
    setRecipe(recipe);
    dispatch(clearPdfUrl());
    setModalOpen([false, false, false, true, false]);
  };
  
  const openModalFind = (): void => setModalOpen([false, false, false, false, true]);

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
    FIND = 4,
  };

  const closeModal = (): void => {
      setModalOpen([false, false, false, false, false]);
  };

  const actionSelectedGroup = (selection: string) => {
    setFilter({ ...filter, group: selection, subgroup: '' });
  };

  const actionSelectedSubgroup = (selection: string) => {
    setFilter({ ...filter, subgroup: selection });
  };

  const actionSelectedName = (name: Value) => {
    setFilter({ ...filter, name: name.value });
    closeModal();
  };

  const actionAdd = async (values: RecipeWithContentNoID) => {
    const recipeToAdd: RecipeNoID = {
      ...values
    };
    const contentWithFile = values.contentwithfile;
    const content: Content2 = await createContent(contentWithFile, 'pdf');
    recipeToAdd.content = content;
    dispatch(addRecipe(recipeToAdd));
    closeModal();
  };

  const actionChange = async (values: RecipeWithContentNoID) => {
    const recipeToChange: Recipe = {
      ...values,
      id: recipe.id
    };
    const contentWithFile = values.contentwithfile;
    if (contentWithFile.file.size>0) {
      const content: Content2 = await updateContent(recipe.content.dataId, contentWithFile, 'pdf');
      recipeToChange.content = content;  
    }
    dispatch(updateRecipe(recipeToChange));
    setRecipe(emptyRecipe());
    closeModal();
  };

  const actionDelete = async() => {
    await removeContent(recipe.content.dataId, 'pdf');
    dispatch(removeRecipe(recipe.id));
    setRecipe(emptyRecipe());
    closeModal();
  };  

  const actionShow = () => {
    setRecipe(emptyRecipe());
    closeModal();
  };

  const actionUpDown = (direction: string, index: number, list: Recipe[]) => {
    if ((direction===Direction.UP && index===0) || (direction===Direction.DOWN && index===list.length-1)) return;
      
    const recipe1: Recipe = list[index]; 
    const recipe2: Recipe = direction===Direction.UP ? list[index-1] : list[index+1];
    const seqnr1 = recipe1.seqnr;
    const seqnr2 = recipe2.seqnr;
    recipe1.seqnr = seqnr2;
    recipe2.seqnr = seqnr1;
    const recipesToChange: Recipe[] = [recipe1, recipe2];
    dispatch(exchangeRecipes(recipesToChange));
    setRecipesChanged(arr => [...arr, recipe1]);
    setRecipesChanged(arr => [...arr, recipe2]);
  };

  const actionSaveSequence = () => {
    recipesChanged.forEach(recipeChanged => {
      dispatch(updateRecipe(recipeChanged));
    });
    setRecipesChanged([]);
  };

  const groupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    groupOptions.push(element.name)
  });

  const getRecipegroup = (groupName: string): Group | undefined => {
    const group = Object.values(groups).filter(group => group.name===groupName);
    return group.length > 0 ? group[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const group = getRecipegroup(filter.group);
  if (group) {
    group.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });
  };

  const filterSelected: boolean = (filter.group!=='' && filter.subgroup!=='') || (filter.group!=='' && getRecipegroup(filter.group)?.subgroups.length===0);
  const sequenceChanged: boolean = recipesChanged.length > 0;
  const title: string = 'Rezeptliste' + recipeTitle(filter);
  const sortedRecipes: Recipe[] = recipeFilter(recipes, filter, groups);

  return (
    <div className='App'>
      <RecipeModal
        edittype={Edittype.ADD}
        title='Neues Rezept anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        recipe={recipe}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <RecipeModal
        edittype={Edittype.SHOW}
        title={'Rezept ' + recipe.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        recipe={recipe}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <RecipeModal
        edittype={Edittype.EDIT}
        title={'Rezept ' + recipe.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        recipe={recipe}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Rezept löschen'
        prompt={'Rezept ' + recipe.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AskString
        header='Rezeptname eingeben'
        prompt='Rezeptname eingeben'
        modalOpen={modalOpen[ModalDialog.FIND]}
        onSubmit={actionSelectedName}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as='select' className='ui dropdown' style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedGroup(event.currentTarget.value)}>
        <option value='' style={styleButton}>Gruppe</option>
        {groupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as='select' className='ui dropdown' style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectedSubgroup(event.currentTarget.value)}>
        <option value='' style={styleButton}>U.Gruppe</option>
        {subgroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button style={styleButton} onClick={() => openModalFind()}>Name</Button>
      <Button style={styleButton} disabled={!sequenceChanged} onClick={() => actionSaveSequence()}>Speichern</Button>
      <Table celled style={{ backgroundColor }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor }} className='five wide center aligned'>Rezepttitel</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='two wide center aligned'>Gruppe</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='two wide center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor }} className='four wide center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(sortedRecipes).map((recipe: Recipe, index: number) => (
            <Table.Row key={recipe.id}>
              <Table.Cell>{recipe.name}</Table.Cell>
              <Table.Cell>{recipe.group}</Table.Cell>
              <Table.Cell>
                <Button className='ui icon button' style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.UP, index, sortedRecipes) }>
                  <i className='angle up icon'></i>
                </Button>
                <Button className='ui icon button' style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.DOWN, index, sortedRecipes) }>
                  <i className='angle down icon'></i>
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button style={styleButton} onClick={() => openModalShow(recipe)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(recipe)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(recipe)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default RecipePage;