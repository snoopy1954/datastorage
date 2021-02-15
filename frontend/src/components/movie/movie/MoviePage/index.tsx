import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Movie, MovieNoID, Moviegroup } from '../../../../../../backend/src/types/movie';
import { Filter } from '../../../../types/movie';
import { Edittype, Direction } from '../../../../types/basic';

import { getOne } from '../../../../services/filesystem/files';

import { RootState } from '../../../../state/store';
import { addMovie, updateMovie, exchangeMovies, removeMovie } from '../../../../state/movie/movielist/actions';
import { setMoviefilter, clearMoviefilter } from '../../../../state/movie/moviefilter/actions';
import { setSelectedMovie, clearSelectedMovie } from '../../../../state/movie/selectedmovie/actions';
import { addChangedMovie, clearChangedMovie } from '../../../../state/movie/changedmovielist/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { MovieModal } from '../MovieModal';

import { movielistTitle, movielistFilter, nextSeqnr, findChecksum, checkSerial } from '../../../../utils/movie/movie';


export const MoviePage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const dispatch = useDispatch();

  const movies: Movie[] = useSelector((state: RootState) => state.movies);
  const movie: Movie = useSelector((state: RootState) => state.movie);
  const moviegroups: Moviegroup[] = useSelector((state: RootState) => state.moviegroups);      
  const moviefilter: Filter = useSelector((state: RootState) => state.moviefilter);
  const changedMovies: Movie[] = useSelector((state: RootState) => state.changedmovies);

  React.useEffect(() => {
    dispatch(clearSelectedMovie());
    dispatch(clearMoviefilter());
  }, [dispatch]);  
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (movie: Movie): void => {
    dispatch(setSelectedMovie(movie));
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (movie: Movie): void => {
    dispatch(setSelectedMovie(movie));
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (movie: Movie): void => {
    dispatch(setSelectedMovie(movie));
    setModalOpen([false, false, false, true]);
  };

  enum ModalDialog {
    NEW = 0,
    DELETE = 1,
    CHANGE = 2,
    SHOW = 3,
  };

  const closeModal = (): void => {
    setModalOpen([false, false, false, false]);
  };

  const actionGroupSelectionClick = ( selection: string) => {
    dispatch(setMoviefilter({ group: selection, subgroup: '' }));
  };

  const actionSubgroupSelectionClick = ( selection: string) => {
    dispatch(setMoviefilter({ group: moviefilter.group, subgroup: selection }));
  };

  const actionAdd = async (values: MovieNoID) => {
    const seqnr = values.title.seqnr===0 ? nextSeqnr(movies, values.moviegroup, values.subgroup)+1 : values.title.seqnr;
    values.title.seqnr = seqnr;
    dispatch(addMovie(values));
    closeModal();
  };

  const actionChange = async (values: MovieNoID) => {
    const movieToChange: Movie = {
      ...values,
      id: movie.id
    };
    dispatch(updateMovie(movieToChange));
    dispatch(clearSelectedMovie());
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeMovie(movie.id));
    dispatch(clearSelectedMovie());
    closeModal();
  };  

  const actionShow = () => {
    dispatch(clearSelectedMovie());
    closeModal();
  };

  const actionImport = async () => {
    const directory: string = moviefilter.group + (moviefilter.subgroup!=='' ? '|' + moviefilter.subgroup : '');
    const fetchList = async () => {
      const list = await getOne(directory, 'mp4');
      Object.values(list).forEach((item, index) => {
        const [ filename, checksum ] = item.split('|');
        let newMovie: MovieNoID = {
          format: 'MP4',
          moviegroup: moviefilter.group,
          subgroup: moviefilter.subgroup,
          title: {
            name: filename.replace('.mp4', ''),
            seqnr: index,
          },
          season: '',
          serial: '',
          maximal: '',
          launched: '',
          filename: filename,
          checksum: checksum,
          comment: '',
          createdAt: new Date(),
          modifiedAt: new Date()
        };
        newMovie = checkSerial(newMovie, moviefilter.subgroup);
        console.log(newMovie.title.name);
        if (!findChecksum(movies, checksum)) {
//          dispatch(addMovie(newMovie));
          console.log(newMovie.title.name);
        }
      });
    };
    fetchList();
  };

  const actionUpDown = (direction: string, index: number, list: Movie[]) => {
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

  const actionSaveSequence = () => {
    Object.values(changedMovies).forEach(changedMovie => {
      dispatch(updateMovie(changedMovie));
    });
    dispatch(clearChangedMovie());
  };

  const moviegroupOptions: string[] = [];
  Object.values(moviegroups).forEach(element => {
    moviegroupOptions.push(element.name)
  });

  const getMoviegroup = (moviegroupName: string): Moviegroup | undefined => {
    const moviegroup = Object.values(moviegroups).filter(moviegroup => moviegroup.name===moviegroupName);
    return moviegroup.length > 0 ? moviegroup[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const moviegroup = getMoviegroup(moviefilter.group);
  if (moviegroup) 
    moviegroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
  });

  const filterSelected = (moviefilter.group!=='' && moviefilter.subgroup!=='') || (moviefilter.group!=='' && getMoviegroup(moviefilter.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(changedMovies).length > 0);
  const title = 'Filmliste' + movielistTitle(moviefilter);
  const sortedMovies = movielistFilter(movies, moviefilter, moviegroups);

  const ShowTableHeader: React.FC = () => {
    return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ backgroundColor, width: '40%' }} className='center aligned'>Filmtitel</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '10%' }} className='center aligned'>Sendetermin</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '5%' }} className='center aligned'>Auf/Ab</Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor, width: '15%' }} className='center aligned'>Aktion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    );
  };

  const ShowTableBody: React.FC = () => {
    return (
        <Table.Body>
          {Object.values(sortedMovies).map((movie: Movie, index: number) => (
            <Table.Row key={movie.id}>
              <Table.Cell style={{ backgroundColor, width: '40%' } } className='left aligned'>{movie.title.name}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '10%' } } className='left aligned'>{movie.launched}</Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '5%' } } className='center aligned'>
                <Button className="ui icon button" style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.UP, index, sortedMovies) }>
                  <i className="angle up icon"></i>
                </Button>
                <Button className="ui icon button" style={styleButtonSmall} disabled={!filterSelected} 
                  onClick={() => actionUpDown(Direction.DOWN, index, sortedMovies) }>
                  <i className="angle down icon"></i>
                </Button>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor, width: '15%' } } className='center aligned'>
                <Button style={styleButton} onClick={() => openModalShow(movie)}>Anzeigen</Button>
                <Button style={styleButton} onClick={() => openModalChange(movie)}>Ändern</Button>
                <Button style={styleButton} onClick={() => openModalDelete(movie)}>Löschen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>        
    );
  };

  return (
    <div className="App">
      <MovieModal
        edittype={Edittype.ADD}
        title='Neuen Film anlegen'
        modalOpen={modalOpen[ModalDialog.NEW]}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <MovieModal
        edittype={Edittype.SHOW}
        title={'Film ' + movie.title.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <MovieModal
        edittype={Edittype.EDIT}
        title={'Film ' + movie.title.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        onSubmit={actionChange}
        onClose={closeModal}
      />
      <AskModal
        header='Film löschen'
        prompt={'Film ' + movie.title.name + ' löschen?'}
        modalOpen={modalOpen[ModalDialog.DELETE]}
        onSubmit={actionDelete}
        onClose={closeModal}
      />
      <AppHeaderH3 text={title} icon='list'/>
      <Button style={styleButton} onClick={() => openModalNew()}>Neu</Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionGroupSelectionClick(event.currentTarget.value)}>
        <option value="" style={styleButton}>Gruppe</option>
        {moviegroupOptions.map((option: string, index: number) => (
          <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button as="select" className="ui dropdown" style={styleButton}
        onChange={(event: React.FormEvent<HTMLInputElement>) => actionSubgroupSelectionClick(event.currentTarget.value)}>
        <option value="" style={styleButton}>U.Gruppe</option>
        {subgroupOptions.map((option: string, index: number) => (
          <option key={index} value={option} style={styleButton}>{option}</option>
        ))}
      </Button>
      <Button style={styleButton} disabled={!filterSelected} onClick={() => actionImport()}>Einlesen</Button>
      <Button style={styleButton} disabled={!sequenceChanged} onClick={() => actionSaveSequence()}>Speichern</Button>
      {sortedMovies.length>8&&
        <Table celled style={{ backgroundColor, marginBottom: '0px', borderBottom: "none", width: '99.36%' }}>
          <ShowTableHeader/>
        </Table>
      }
      {sortedMovies.length>8&&
        <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
          <div style={{ overflowY: 'scroll', height: '550px' }}>
            <ShowTableBody/>
          </div>
        </Table>
      }
      {sortedMovies.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
          <div>
            <ShowTableHeader/>
            <ShowTableBody/>
          </div>
        </Table>
      }
    </div>
  );
};

export default MoviePage;