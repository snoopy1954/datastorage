import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeSportgroups } from '../../state/sport/groups/actions';
import { initializeYears } from '../../state/sport/years/actions';
import { initializeActivities } from '../../state/sport/activities/actions';

import { AppHeaderH2 } from '../basic/header';
import { ActivityPage } from './activity/ActivityPage';
import { GroupPage } from './group/GroupPage';
import { YearPage } from './year/YearPage';


const Sport: React.FC = () => { 
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    dispatch(initializeSportgroups());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeYears());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeActivities());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'activity' }));
  }, [mainpage, dispatch]);
 
  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Sport' icon='exclamation'/>
      <Button style={styleButton} onClick={() => actionSelect('activity')}>Aktivitäten</Button>
      <Button style={styleButton} onClick={() => actionSelect('group')}>Gruppen</Button>
      <Button style={styleButton} onClick={() => actionSelect('year')}>Jahr</Button>
      {subpage==='activity'&&<ActivityPage/>}
      {subpage==='group'&&<GroupPage/>}
      {subpage==='year'&&<YearPage/>}
    </div>
  );
}

export default Sport;