import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeGroups } from '../../state/basic/groups/actions';
import { initializeArtists } from '../../state/music/artists/actions';

import { AppHeaderH2 } from '../basic/header';
import { GroupPage } from '../basic/group/GroupPage';
import { ArtistPage } from './artist/ArtistPage';
import { CdPage } from './cd/CdPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/music/group';


const Music: React.FC = () => {  
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
    dispatch(initializeArtists());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'artists' }));
  }, [mainpage, dispatch]);

  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Musik' icon='music'/>
      <Button style={styleButton} onClick={() => actionSelect('artists')}>Interpreten</Button>
      <Button style={styleButton} onClick={() => actionSelect('cds')}>CDs</Button>
      <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppen</Button>
      {subpage==='artists'&&<ArtistPage/>}
      {subpage==='cds'&&<CdPage/>}
      {subpage==='groups'&&<GroupPage title='Gruppe' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
    </div>
  );
}

export default Music;