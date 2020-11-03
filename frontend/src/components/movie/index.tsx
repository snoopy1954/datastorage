import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../state/store';
import { setPage } from '../../state/page/actions';
import { initializeMovies } from '../../state/movie/movielist/actions';
import { initializeMoviegroups } from '../../state/movie/moviegrouplist/actions';
import { initializeMovieformats } from '../../state/movie/movieformatlist/actions';

import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";

import MovieListPage from "./movie/MovieListPage";
import MoviegroupListPage from "./moviegroup/MoviegroupListPage";
import MovieformatListPage from "./movieformat/MovieformatListPage";


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

  const handleSelection = (selected: string) => {
    dispatch(setPage({ mainpage, subpage: selected }));
  };

  const buttons: Item[] = 
  [
    {
      name: 'movies',
      title: 'Filme',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'moviegroup',
      title: 'Gruppe',
      color: 'blue',
      onClick: handleSelection
    },
    {
      name: 'movieformat',
      title: 'Format',
      color: 'blue',
      onClick: handleSelection
    },
  ];

  return (
    <div className="App">
      <AppHeaderH2 text='Filme' icon='video'/>
      <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
      {subpage==='movies'&&<MovieListPage/>}
      {subpage==='moviegroup'&&<MoviegroupListPage/>}
      {subpage==='movieformat'&&<MovieformatListPage/>}
    </div>
  );
}
    
export default Movie;
