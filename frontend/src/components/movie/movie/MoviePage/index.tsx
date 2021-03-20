import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from "semantic-ui-react";
import { backgroundColor, styleButton, styleButtonSmall } from '../../../../constants';

import { Movie, MovieNoID } from '../../../../../../backend/src/types/movie';
import { Group } from '../../../../../../backend/src/types/basic';
import { Filter } from '../../../../types/movie';
import { Edittype, Direction } from '../../../../types/basic';

import { getOne } from '../../../../services/filesystem/files';

import { RootState } from '../../../../state/store';
import { addMovie, updateMovie, exchangeMovies, removeMovie } from '../../../../state/movie/movies/actions';

import { AppHeaderH3 } from '../../../basic/header';
import { AskModal } from '../../../basic/askModal';
import { MovieModal } from '../MovieModal';

import { movielistTitle, movielistFilter, nextSeqnr, findChecksum, checkSerial, newFilter, emptyMovie } from '../../../../utils/movie/movie';


export const MoviePage: React.FC = () => {
  const [movie, setMovie] = useState<Movie>(emptyMovie());
  const [filter, setFilter] = useState<Filter>(newFilter());
  const [moviesChanged, setMoviesChanged] = useState<Array<Movie>>([]);
  const [modalOpen, setModalOpen] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  
  const dispatch = useDispatch();

  const movies: Movie[] = useSelector((state: RootState) => state.movies);
  const groups: Group[] = useSelector((state: RootState) => state.groups);      
  
  const openModalNew = (): void => setModalOpen([true, false, false, false]);
    
  const openModalDelete = (movie: Movie): void => {
    setMovie(movie);
    setModalOpen([false, true, false, false]);
  };
    
  const openModalChange = (movie: Movie): void => {
    setMovie(movie);
    setModalOpen([false, false, true, false]);
  };
    
  const openModalShow = (movie: Movie): void => {
    setMovie(movie);
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
    setFilter({ group: selection, subgroup: '' });
  };

  const actionSubgroupSelectionClick = ( selection: string) => {
    setFilter({ group: filter.group, subgroup: selection });
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
    setMovie(emptyMovie);
    closeModal();
  };

  const actionDelete = () => {
    dispatch(removeMovie(movie.id));
    setMovie(emptyMovie);
    closeModal();
  };  

  const actionShow = () => {
    setMovie(emptyMovie);
    closeModal();
  };

  const actionImport = async () => {
    const directory: string = filter.group + (filter.subgroup!=='' ? '|' + filter.subgroup : '');
    const fetchList = async () => {
      const list = await getOne(directory, 'mp4');
      Object.values(list).forEach((item, index) => {
        const [ filename, checksum ] = item.split('|');
        let newMovie: MovieNoID = {
          format: 'MP4',
          moviegroup: filter.group,
          subgroup: filter.subgroup,
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
        newMovie = checkSerial(newMovie, filter.subgroup);
        console.log(newMovie.title.name);
        if (!findChecksum(movies, checksum)) {
          dispatch(addMovie(newMovie));
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
    setMoviesChanged(arr => [...arr, movie1]);
    setMoviesChanged(arr => [...arr, movie2]);
  };

  const actionSaveSequence = () => {
    Object.values(moviesChanged).forEach(movieChanged => {
      dispatch(updateMovie(movieChanged));
    });
    setMoviesChanged([]);
  };

  const moviegroupOptions: string[] = [];
  Object.values(groups).forEach(element => {
    moviegroupOptions.push(element.name)
  });

  const getMoviegroup = (moviegroupName: string): Group | undefined => {
    const moviegroup = Object.values(groups).filter(moviegroup => moviegroup.name===moviegroupName);
    return moviegroup.length > 0 ? moviegroup[0] : undefined;
  };

  const subgroupOptions: string[] = [];
  const moviegroup = getMoviegroup(filter.group);
  if (moviegroup) 
    moviegroup.subgroups.forEach(element => {
      subgroupOptions.push(element);
  });

  const filterSelected = (filter.group!=='' && filter.subgroup!=='') || (filter.group!=='' && getMoviegroup(filter.group)?.subgroups.length===0);
  const sequenceChanged = (Object.values(moviesChanged).length > 0);
  const title = 'Filmliste' + movielistTitle(filter);
  const sortedMovies = movielistFilter(movies, filter, groups);

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
        movie={movie}
        onSubmit={actionAdd}
        onClose={closeModal}
      />
      <MovieModal
        edittype={Edittype.SHOW}
        title={'Film ' + movie.title.name + ' anzeigen'}
        modalOpen={modalOpen[ModalDialog.SHOW]}
        movie={movie}
        onSubmit={actionShow}
        onClose={closeModal}
      />
      <MovieModal
        edittype={Edittype.EDIT}
        title={'Film ' + movie.title.name + ' ändern'}
        modalOpen={modalOpen[ModalDialog.CHANGE]}
        movie={movie}
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
        <div style={{ overflowY: 'scroll', height: '550px' }}>
          <Table celled style={{ backgroundColor, marginTop: '0px', borderTop: "none" }}>
            <ShowTableBody/>
          </Table>
        </div>
      }
      {sortedMovies.length<9&&
        <Table celled style={{ backgroundColor, marginTop: '15px', borderTop: "none", width: '99.36%' }}>
            <ShowTableHeader/>
            <ShowTableBody/>
        </Table>
      }
    </div>
  );
};

export default MoviePage;