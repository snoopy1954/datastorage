import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeGroups } from '../../state/groups/actions';
import { initializeRecipes } from '../../state/recipe/recipes/actions';

import { AppHeaderH2 } from '../basic/header';
import { GroupPage } from '../basic/group/GroupPage';
import { RecipePage } from './recipe/RecipePage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/recipe/group';


const Recipe: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    const fetchGroups = async () => {
      const groups: Group[] = await getAllDB();
      dispatch(initializeGroups(groups));
    }
    fetchGroups();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeRecipes());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'recipes' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Rezepte' icon='coffee'/>
      <Button style={styleButton} onClick={() => actionSelect('recipes')}>Rezepte</Button>
      <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppe</Button>
      {subpage==='recipes'&&<RecipePage/>}
      {subpage==='groups'&&<GroupPage title='Rezeptgruppe' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
    </div>
  );
}
    
export default Recipe;
    