import { Movieformat, MovieformatNoID } from '../../../../backend/src/types/movie';

import { newName } from '../basic/basic';

export const newMovieformat = (): MovieformatNoID => {
    const movieformat: MovieformatNoID = newName();

    return movieformat;
};

export const emptyMovieformat = (): Movieformat => {
    const movieformat: Movieformat = {
        id: '',
        name: newName().name,
        seqnr: newName().seqnr
    }
    return movieformat;
};

