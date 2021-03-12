import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeGroups } from '../../state/groups/actions';
import { initializeYears } from '../../state/sport/years/actions';
import { initializeActivities } from '../../state/sport/activities/actions';

import { AppHeaderH2 } from '../basic/header';
import { ActivityPage } from './activity/ActivityPage';
import { GroupPage } from '../basic/group/GroupPage';
import { YearPage } from './year/YearPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/sport/group';


const Sport: React.FC = () => { 
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
    dispatch(initializeYears());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeActivities());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'activities' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Sport' icon='blind'/>
      <Button style={styleButton} onClick={() => actionSelect('activities')}>Aktivitäten</Button>
      <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppen</Button>
      <Button style={styleButton} onClick={() => actionSelect('years')}>Jahr</Button>
      {subpage==='activities'&&<ActivityPage/>}
      {subpage==='groups'&&<GroupPage title='Sportgruppe' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
      {subpage==='years'&&<YearPage/>}
    </div>
  );
}

export default Sport;