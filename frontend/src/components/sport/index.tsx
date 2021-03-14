import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group, Year } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeGroups } from '../../state/basic/groups/actions';
import { initializeYears } from '../../state/basic/years/actions';
import { initializeActivities } from '../../state/sport/activities/actions';

import { AppHeaderH2 } from '../basic/header';
import { ActivityPage } from './activity/ActivityPage';
import { GroupPage } from '../basic/group/GroupPage';
import { YearPage } from '../basic/year/YearPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/sport/group';
import { getAllYearDB, createYearDB, updateYearDB, removeYearDB } from '../../utils/sport/year';


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
    const fetchYears = async () => {
      const years: Year[] = await getAllYearDB();
      dispatch(initializeYears(years));
    }
    fetchYears();
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
      {subpage==='years'&&<YearPage title='Jahre' createYearDB={createYearDB} updateYearDB={updateYearDB} removeYearDB={removeYearDB}/>}
    </div>
  );
}

export default Sport;