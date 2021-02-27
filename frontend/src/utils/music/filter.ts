import { Filter } from '../../types/music';

export const newFilter = (): Filter => {
    const filter: Filter = {
        group: '',
        startcharacter: '',
        name: ''
    }

    return filter;
};
