import { Moviegroup, MoviegroupNoID } from '../../../../backend/src/types/movie';

export const newMoviegroup = (): MoviegroupNoID => {
    const moviegroup: MoviegroupNoID = {
        name: "",
        seqnr: 0,
        subgroups: []
    };

    return moviegroup;
};

export const emptyMoviegroup = (): Moviegroup => {
    const moviegroup: Moviegroup = {
        id: '',
        name: "",
        seqnr: 0,
        subgroups: []
    }
    return moviegroup;
};

