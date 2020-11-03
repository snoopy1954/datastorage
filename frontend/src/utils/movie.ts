import { MD5 } from 'crypto-js';

import { Movie, MovieNoID, Moviegroup, Filter } from '../../../backend/src/types/movie';

const sortMovies = (a: Movie, b: Movie) => {
    const nameA = a.title.seqnr;
    const nameB = b.title.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const sortMovieList = (movies: Movie[], moviegroups: Moviegroup[]) => {
    let movieListSorted: Movie[] = [];
    let sortedMoviegroup;
    let sortedSubgroup;

    moviegroups.forEach(moviegroup => {
        sortedMoviegroup = [];
        if (moviegroup.subgroups.length===0) {
            sortedMoviegroup = movies.filter(movie => movie.moviegroup===moviegroup.groupname.name);
            movieListSorted = movieListSorted.concat(sortedMoviegroup.sort(sortMovies));
        }
        else {
            moviegroup.subgroups.forEach(subgroup => {
                sortedSubgroup = movies.filter(movie => movie.subgroup===subgroup);
                movieListSorted = movieListSorted.concat(sortedSubgroup.sort(sortMovies));
            });
        }
    });
        
    return movieListSorted;
}

export const newMovie = (): MovieNoID => {
    const movie = {
    title: {
        name: "",
        seqnr: 0
      },
      comment: "",
      filename: "",
      checksum: "",
      moviegroup: "",
      subgroup: "",
      format: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    return movie;
}

export const movielistTitle = (filters: Filter): string => {
    let filter = (filters.group!=="") ? ': ' + filters.group : '';
    filter += (filters.subgroup!=="") ? ' - ' + filters.subgroup : '';

    return filter;
}

export const movielistFilter = (movies: Movie[], filters: Filter, moviegroups: Moviegroup[]): Movie[] => {

    let filteredMovies = (filters.group!=="") ? Object.values(movies).filter(movie => movie.moviegroup===filters.group) : movies;
    filteredMovies = (filters.subgroup!=="") ? Object.values(filteredMovies).filter(movie => movie.subgroup===filters.subgroup) : filteredMovies;
    const sortedMovies = sortMovieList(Object.values(filteredMovies), Object.values(moviegroups));

    return sortedMovies;
}

export const nextSeqnr = (movies: Movie[], group: string, subgroup: string): number => {
    let maxNumber = 0;
    Object.values(movies).forEach(movie => {
        if (movie.moviegroup===group&&movie.subgroup===subgroup&&movie.title.seqnr>maxNumber) maxNumber = movie.title.seqnr;
    });
    
    return maxNumber;
}

export const getMD5 = (text: string): string => {
    return MD5(text).toString();
}


