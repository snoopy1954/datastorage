import { Movie, MovieNoID } from '../../../../backend/src/types/movie';
import { Group } from '../../../../backend/src/types/basic';
import { Filter } from '../../types/movie';

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

const sortMovieList = (movies: Movie[], moviegroups: Group[]) => {
    let movieListSorted: Movie[] = [];
    let sortedMoviegroup;
    let sortedSubgroup;

    moviegroups.forEach(moviegroup => {
        sortedMoviegroup = [];
        if (moviegroup.subgroups.length===0) {
            sortedMoviegroup = movies.filter(movie => movie.moviegroup===moviegroup.name);
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
};

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
        season: '',
        serial: '',
        maximal: '',
        launched: '',
        createdAt: new Date(),
        modifiedAt: new Date(),
    };

    return movie;
};

export const emptyMovie = (): Movie => {
    const movie = {
        id: '',
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
        season: '',
        serial: '',
        maximal: '',
        launched: '',
        createdAt: new Date(),
        modifiedAt: new Date(),
    };

    return movie;
};

export const movielistTitle = (filters: Filter): string => {
    let filter = (filters.group!=="") ? ': ' + filters.group : '';
    filter += (filters.subgroup!=="") ? ' - ' + filters.subgroup : '';

    return filter;
};

export const movielistFilter = (movies: Movie[], filters: Filter, moviegroups: Group[]): Movie[] => {

    let filteredMovies = (filters.group!=="") ? Object.values(movies).filter(movie => movie.moviegroup===filters.group) : movies;
    filteredMovies = (filters.subgroup!=="") ? Object.values(filteredMovies).filter(movie => movie.subgroup===filters.subgroup) : filteredMovies;
    const sortedMovies = sortMovieList(Object.values(filteredMovies), Object.values(moviegroups));

    return sortedMovies;
};

export const nextSeqnr = (movies: Movie[], group: string, subgroup: string): number => {
    let maxNumber = 0;
    Object.values(movies).forEach(movie => {
        if (movie.moviegroup===group&&movie.subgroup===subgroup&&movie.title.seqnr>maxNumber) maxNumber = movie.title.seqnr;
    });
    
    return maxNumber;
};

export const findChecksum = (movies: Movie[], checksum: string): boolean => {
    let found: boolean = false;
    Object.values(movies).forEach(movie => {
        if (movie.checksum===checksum) found = true;
    });

    return found;
};

export const checkSerial = (movie: MovieNoID, subgroup: string): MovieNoID => {
    let newMovie: MovieNoID = { ...movie };

    let numberOfDash: number = 0;
    for (let iii = 0; iii < newMovie.title.name.length; iii++) {
        if (newMovie.title.name.charAt(iii)==='-') numberOfDash++;
    };
    switch (subgroup) {
        case "The Killing":
            if (numberOfDash===3) {
                const [ a,b,c ] = newMovie.title.name.split('-');
                const seqnr: number = +(a.trim()+(b.trim().length===2 ? b.trim() : '0'+b.trim()));
                const season: string = a.trim();
                const serial: string = b.trim();
                const maximal: string = c.trim();
                const comment: string = 'Kopenhagen (Lund)';
                newMovie.title.seqnr = seqnr;
                switch (season) {
                    case '1':
                        newMovie.launched = '2007';
                        break;
                    case '2':
                        newMovie.launched = '2009';
                        break;
                    case '3':
                        newMovie.launched = '2012';
                        break;
                    default:
                }
                newMovie.season = season;
                newMovie.serial = serial;
                newMovie.maximal = maximal;
                newMovie.comment = comment;
            }
            break;
        case "Tatort":
            if (numberOfDash===4) {
                const [ a,,c,d,e ] = newMovie.title.name.split('-');
                const seqnr: number = +(a.trim());
                const serial: string = a.trim();
                const launched: string = e.trim();
                const comment: string = c.trim() + ' (' + d.trim() + ')';
                newMovie.title.seqnr = seqnr;
                newMovie.launched = launched;
                newMovie.serial = serial;
                newMovie.comment = comment;
            }
            break;
        case "Wilsberg":
            if (numberOfDash===1) {
                const [ a, ] = newMovie.title.name.split('-');
                const seqnr: number = +(a.trim());
                const serial: string = a.trim();
                const comment: string = 'Wilsberg (Münster)';
                newMovie.title.seqnr = seqnr;
                newMovie.serial = serial;
                newMovie.comment = comment;
            }
            break;
        case "Wallander":
            if (numberOfDash===1) {
                const [ a, ] = newMovie.title.name.split('-');
                const seqnr: number = +(a.trim());
                const serial: string = a.trim();
                const comment: string = 'Wallander (Schweden)';
                newMovie.title.seqnr = seqnr;
                newMovie.serial = serial;
                newMovie.comment = comment;
            }
            break;
        default:
            break;
    }

    return newMovie;
};

export const newFilter = (): Filter => {
    const filter: Filter = {
        group: '',
        subgroup: ''
    }

    return filter;
};
