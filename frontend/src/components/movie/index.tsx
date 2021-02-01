import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { styleButton } from '../../constants';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeMovies } from '../../state/movie/movielist/actions';
import { initializeMoviegroups } from '../../state/movie/moviegrouplist/actions';
import { initializeMovieformats } from '../../state/movie/movieformatlist/actions';

import { AppHeaderH2 } from '../basic/header';
import { MoviePage } from './movie/MoviePage';
import { MoviegroupPage } from './moviegroup/MoviegroupPage';
import { MovieformatPage } from './movieformat/MovieformatPage';


const Movie: React.FC = () => {
  const dispatch = useDispatch();

  const mainpage = useSelector((state: RootState) => state.page.mainpage);      
  const subpage = useSelector((state: RootState) => state.page.subpage);      

  React.useEffect(() => {
    dispatch(initializeMoviegroups());
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
      <Button style={styleButton} onClick={() => actionSelect('moviegroup')}>Gruppe</Button>
      <Button style={styleButton} onClick={() => actionSelect('movieformat')}>Format</Button>
      {subpage==='movies'&&<MoviePage/>}
      {subpage==='moviegroup'&&<MoviegroupPage/>}
      {subpage==='movieformat'&&<MovieformatPage/>}
    </div>
  );
}
    
export default Movie;
