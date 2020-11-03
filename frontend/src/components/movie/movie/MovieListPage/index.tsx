import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";

import { Movie, MovieNoID, Moviegroup, Filter } from '../../../../../../backend/src/types/movie';
import { Edittype, Direction } from "../../../../types/basic";

import { RootState } from '../../../../state/store';
import { setPage } from '../../../../state/page/actions';
import { addMovie, updateMovie, exchangeMovies } from '../../../../state/movie/movielist/actions';
import { setMoviefilter, clearMoviefilter } from '../../../../state/movie/moviefilter/actions';
import { setSelectedMovie, clearSelectedMovie } from '../../../../state/movie/selectedmovie/actions';
import { addChangedMovie, clearChangedMovie } from '../../../../state/movie/changedmovielist/actions';
import { setSortButton, clearSortButton } from '../../../../state/address/sortbutton/actions';

import { AppHeaderH3Plus } from "../../../basic/header";
import { AppMenuOpt, ItemOpt } from "../../../basic/menu";

import { backgroundColor, styleMainMenu } from "../../../../constants";
import { movielistTitle, movielistFilter, nextSeqnr } from "../../../../utils/movie";

import AddMovieModal from "../AddMovieModal";
import MovieDetailsPage from "../MovieDetailsPage";


const MovieListPage: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const dispatch = useDispatch();

    const mainpage: string = useSelector((state: RootState) => state.page.mainpage);
    const movies: Movie[] = useSelector((state: RootState) => state.movies);
    const movie: Movie = useSelector((state: RootState) => state.movie);
    const moviegroups: Moviegroup[] = useSelector((state: RootState) => state.moviegroups);      
    const moviefilter: Filter = useSelector((state: RootState) => state.moviefilter);
    const changedMovies: Movie[] = useSelector((state: RootState) => state.changedmovies);
    const sortbutton: boolean = useSelector((state: RootState) => state.sortbutton);

    React.useEffect(() => {
        dispatch(clearSelectedMovie());
        dispatch(clearSortButton());
        dispatch(clearMoviefilter());
    }, [dispatch]);  
  
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const handleSelection = async (movie: Movie) => {
      dispatch(setSelectedMovie(movie));
    };

    const handleSelectionClick = (filter: string, selection: string) => {
      switch (filter) {
        case 'Gruppe':
          dispatch(setMoviefilter({ group: selection, subgroup: '' }));
          break;
        case 'Untergruppe':
          dispatch(setMoviefilter({ group: moviefilter.group, subgroup: selection }));
          break;
        default:
        }
    };

    const handleNewMovie = async (values: MovieNoID) => {
      const seqnr = values.title.seqnr===0 ? nextSeqnr(movies, values.moviegroup, values.subgroup)+1 : values.title.seqnr;
        values.title.seqnr = seqnr;
        dispatch(addMovie(values));
        closeModal();
    };

    const handleClose = () => {
        dispatch(clearMoviefilter());
        dispatch(setPage({ mainpage, subpage: 'movies' }));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleDummy = () => {
    };

    const handleUpDown = (direction: string, index: number, list: Movie[]) => {
      if ((direction===Direction.UP && index===0) || (direction===Direction.DOWN && index===list.length-1)) return;

      const movie1: Movie = list[index]; 
      const movie2: Movie = direction===Direction.UP ? list[index-1] : list[index+1];
      const seqnr1 = movie1.title.seqnr;
      const seqnr2 = movie2.title.seqnr;
      movie1.title.seqnr = seqnr2;
      movie2.title.seqnr = seqnr1;
      const moviesToChange: Movie[] = [movie1, movie2];
      dispatch(exchangeMovies(moviesToChange));
      dispatch(addChangedMovie(movie1));
      dispatch(addChangedMovie(movie2));
    };

    const saveSequence = () => {
      Object.values(changedMovies).forEach(changedMovie => {
        dispatch(updateMovie(changedMovie));
      });
      dispatch(clearChangedMovie());
      dispatch(clearSortButton());
    };

    const handleSort = () => {
      dispatch(setSortButton());
    };

    const moviegroupOptions: string[] = [];
    Object.values(moviegroups).forEach(element => {
      moviegroupOptions.push(element.groupname.name)
    });

    const getMoviegroup = (moviegroupName: string): Moviegroup | undefined => {
      const moviegroup = Object.values(moviegroups).filter(moviegroup => moviegroup.groupname.name===moviegroupName);
      return moviegroup.length > 0 ? moviegroup[0] : undefined;
    };

    const subgroupOptions: string[] = [];
    const moviegroup = getMoviegroup(moviefilter.group);
    if (moviegroup) 
      moviegroup.subgroups.forEach(element => {
        subgroupOptions.push(element);
    });

    const buttons: ItemOpt[] = [
      {
        name: 'Schliessen',
        title: 'Alle',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleClose,
        onSelection: handleDummy
      },
      {
        name: 'Gruppe',
        title: 'Gruppe',
        color: 'blue',
        type: '1',
        options: moviegroupOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Untergruppe',
        title: 'Untergruppe',
        color: 'blue',
        type: '1',
        options: subgroupOptions,    
        onClick: handleDummy,
        onSelection: handleSelectionClick
      },
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: openModal,
        onSelection: handleDummy
      },
    ];

    if ((moviefilter.group!=='' && moviefilter.subgroup!=='') || (moviefilter.group!=='' && getMoviegroup(moviefilter.group)?.subgroups.length===0)) {
      buttons[buttons.length] =     {
        name: 'Sort',
        title: 'Sort',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: handleSort,
        onSelection: handleDummy
      };
    }

    if (Object.values(changedMovies).length > 0) {
      buttons[buttons.length] = {
        name: 'Speichern',
        title: 'Speichern',
        color: 'blue',
        type: '0',
        options: [],    
        onClick: saveSequence,
        onSelection: handleDummy
      };
    }

    if (movie.id!=='') {
      return (
        <MovieDetailsPage/>
      )
    }

    const title = 'Filmliste' + movielistTitle(moviefilter);
    const sortedMovies = movielistFilter(movies, moviefilter, moviegroups);

    return (
        <div className="App">
          <AppHeaderH3Plus text={title} icon='list'/>
          <AddMovieModal
            edittype={Edittype.ADD}
            modalOpen={modalOpen}
            onSubmit={handleNewMovie}
            error={error}
            onClose={closeModal}
          />
          <AppMenuOpt menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
          <Table celled style={{ backgroundColor }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Filmtitel</Table.HeaderCell>
                <Table.HeaderCell>Gruppe</Table.HeaderCell>
                <Table.HeaderCell>Untergruppe</Table.HeaderCell>
                {sortbutton&&<Table.HeaderCell>Reihenfolge</Table.HeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(sortedMovies).map((movie: Movie, index: number) => (
                <Table.Row key={movie.id}>
                  <Table.Cell onClick={() => handleSelection(movie)}>{movie.title.name}</Table.Cell>
                  <Table.Cell>{movie.moviegroup}</Table.Cell>
                  <Table.Cell>{movie.subgroup}</Table.Cell>
                  {sortbutton&&<Table.Cell>
                    <Button className="ui icon button" color='green' onClick={() => handleUpDown(Direction.UP, index, sortedMovies) }>
                      <i className="angle up icon"></i>
                    </Button>
                    <Button className="ui icon button" color='green' onClick={() => handleUpDown(Direction.DOWN, index, sortedMovies) }>
                      <i className="angle down icon"></i>
                    </Button>
                  </Table.Cell>}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
       </div>
      );
}

export default MovieListPage;