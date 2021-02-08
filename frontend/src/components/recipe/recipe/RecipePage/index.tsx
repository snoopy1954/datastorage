import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Group, Content } from '../../../../../../backend/src/types/basic';
import { Recipe, RecipeNoID } from '../../../../../../backend/src/types/recipe';
import { Filter, RecipeWithFileNoID } from '../../../../types/recipe';
import { Edittype, Direction } from '../../../../types/basic';

import { RootState } from '../../../../state/store';
import { setRecipefilter, clearRecipefilter } from '../../../../state/recipe/recipefilter/actions';
import { addRecipe, updateRecipe, exchangeRecipes, removeRecipe } from '../../../../state/recipe/recipes/actions';
import { setSelectedRecipe, clearSelectedRecipe } from '../../../../state/recipe/recipe/actions';
import { addChangedRecipe, clearChangedRecipe } from '../../../../state/recipe/changedrecipes/actions';
import { clearPdfUrl } from '../../../../state/axa/pdfUrl/actions';

import { create2 } from '../../../../services/image/images';

import { AppHeaderH3 } from '../../../basic/header';
import { AskString, Value } from '../../../basic/askString';
import { AskModal } from '../../../basic/askModal';
import { RecipeModal } from '../RecipeModal';

import { recipeTitle, recipeFilter } from '../../../../utils/recipe/recipe';


export const RecipePage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false]);
  const dispatch = useDispatch();

  const recipegroups: Group[] = useSelector((state: RootState) => state.recipegroups);      
  const filters: Filter = useSelector((state: RootState) => state.recipefilter);
  const recipes: Recipe[] = useSelector((state: RootState) => state.recipes);
  const recipe: Recipe = useSelector((state: RootState) => state.recipe);
  const changedRecipes: Recipe[] = useSelector((state: RootState) => state.changedrecipes);

  React.useEffect(() => {
    dispatch(clearSelectedRecipe());
    dispatch(clearRecipefilter());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false, false]);

  const openModalDelete = (recipe: Recipe): void => {
    dispatch(setSelectedRecipe(recipe));
    setModalOpen([false, true, false, false, false]);
  };
      
  const openModalChange = (recipe: Recipe): void => {
    dispatch(setSelectedRecipe(recipe));
    setModalOpen([false, false, true, false, false]);
  };
      
  const openModalShow = (recipe: Recipe): void => {
    dispatch(setSelectedRecipe(recipe));
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

  const actionSelectionClick = (filter: string, selection: string) => {
    switch (filter) {
      case 'Gruppe':
        dispatch(setRecipefilter({
          ...filters, 
          group: selection,
          subgroup: ''
        }));
        break;
      case 'Untergruppe':
        dispatch(setRecipefilter({
          ...filters, 
          subgroup: selection
        }));
        break;
      default:
    }
  };

  const actionSelectedName = (name: Value) => {
    dispatch(setRecipefilter({ 
      ...filters, 
      name: name.value }));
    closeModal();
  };

  const actionAdd = async (values: RecipeWithFileNoID) => {
    const file: File = values.file;
    const content: Content = await create2(file);
    const recipe: RecipeNoID = {
      name: values.name,
      seqnr: values.seqnr,
      group: values.group,
      subgroup: values.subgroup,
      content: content,
      keywords: values.keywords
    };
    dispatch(addRecipe(recipe));
    closeModal();
  };

  const actionChange = async (values: RecipeNoID) => {
    const recipeToChange: Recipe = {
      ...values,
      id: recipe.id
    };
    dispatch(updateRecipe(recipeToChange));
    dispatch(clearSelectedRecipe());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeRecipe(recipe.id));
    dispatch(clearSelectedRecipe());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedRecipe());
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
    dispatch(addChangedRecipe(recipe1));
    dispatch(addChangedRecipe(recipe2));
  };

  const actionSaveSequence = () => {
    Object.values(changedRecipes).forEach(changedRecipe => {
      dispatch(updateRecipe(changedRecipe));
    });
    dispatch(clearChangedRecipe());
  };

  const recipegroupOptions: string[] = [];
  Object.values(recipegroups).forEach(element => {
    recipegroupOptions.push(element.name)
  });

  const getRecipegroup = (recipegroupName: string): Group | undefined => {
    const recipegroup = Object.values(recipegroups).filter(recipegroup => recipegroup.name===recipegroupName);
    return recipegroup.length > 0 ? recipegroup[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const recipegroup = getRecipegroup(filters.group);
  if (recipegroup) {
    recipegroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
    });
  };

  const filterSelected = (filters.group!=='' && filters.subgroup!=='') || (filters.group!=='' && getRecipegroup(filters.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(changedRecipes).length > 0);
  const title = 'Rezeptliste' + recipeTitle(filters);
  const sortedRecipes = recipeFilter(recipes, filters, recipegroups);

  return (
    <div className='App'>
      <RecipeModal
        edittype={Edittype.ADD}
        title='Neues Rezept anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <RecipeModal
        edittype={Edittype.SHOW}
        title={'Rezept ' + recipe.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <RecipeModal
        edittype={Edittype.EDIT}
        title={'Rezept ' + recipe.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
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
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Gruppe', event.currentTarget.value)}>
        <option value='' style={styleButton}>Gruppe</option>
        {recipegroupOptions.map((option: string, index: number) => (
        <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as='select' className='ui dropdown' style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSelectionClick('Untergruppe', event.currentTarget.value)}>
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