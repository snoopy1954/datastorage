import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeMusicgroups } from '../../state/music/groups/actions';
import { initializeArtists } from '../../state/music/artists/actions';

import { AppHeaderH2 } from '../basic/header';
import { GroupPage } from './group/GroupPage';
import { ArtistPage } from './artist/ArtistPage';
import { CdPage } from './cd/CdPage';


const Music: React.FC = () => {  
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    dispatch(initializeMusicgroups());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeArtists());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'artist' }));
  }, [mainpage, dispatch]);

  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }))
  };

  return (
    <div className='App'>
      <AppHeaderH2 text='Musik' icon='music'/>
      <Button style={styleButton} onClick={() => actionSelect('artist')}>Interpreten</Button>
      <Button style={styleButton} onClick={() => actionSelect('cd')}>CDs</Button>
      <Button style={styleButton} onClick={() => actionSelect('group')}>Gruppen</Button>
      {subpage==='artist'&&<ArtistPage/>}
      {subpage==='cd'&&<CdPage/>}
      {subpage==='group'&&<GroupPage/>}
    </div>
  );
}

export default Music;