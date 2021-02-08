import { Filter } from '../../types/document';

export const newFilter = (): Filter => {
    const filter: Filter = {
        group: '',
        subgroup: '',
        year: '',
        person: ''
    }

    return filter;
};
