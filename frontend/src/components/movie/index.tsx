import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { Group } from '../../../../backend/src/types/basic';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeMovies } from '../../state/movie/movielist/actions';
// import { initializeGroups } from '../../state/movie/moviegrouplist/actions';
import { initializeMovieformats } from '../../state/movie/movieformatlist/actions';
import { initializeGroups } from '../../state/basic/groups/actions';

import { AppHeaderH2 } from '../basic/header';
import { MoviePage } from './movie/MoviePage';
// import { MoviegroupPage } from './moviegroup/MoviegroupPage';
import { MovieformatPage } from './movieformat/MovieformatPage';
import { GroupPage } from '../basic/group/GroupPage';

import { getAllDB, createDB, updateDB, removeDB } from '../../utils/movie/group';


const Movie: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  // React.useEffect(() => {
  //   dispatch(initializeGroups());
  // }, [dispatch]);

  React.useEffect(() => {
    const fetchGroups = async () => {
      const groups: Group[] = await getAllDB();
      dispatch(initializeGroups(groups));
    }
    fetchGroups();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeMovieformats());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(initializeMovies());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage({ mainpage, subpage: 'movies' }));
  }, [mainpage, dispatch]);

  const actionSelect = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  return (
    <div className="App">
      <AppHeaderH2 text='Filme' icon='video'/>
      <Button style={styleButton} onClick={() => actionSelect('movies')}>Filme</Button>
      <Button style={styleButton} onClick={() => actionSelect('groups')}>Gruppe</Button>
      <Button style={styleButton} onClick={() => actionSelect('movieformat')}>Format</Button>
      {subpage==='movies'&&<MoviePage/>}
      {subpage==='groups'&&<GroupPage title='Gruppe' createGroupDB={createDB} updateGroupDB={updateDB} removeGroupDB={removeDB}/>}
      {subpage==='movieformat'&&<MovieformatPage/>}
    </div>
  );
}
    
export default Movie;
