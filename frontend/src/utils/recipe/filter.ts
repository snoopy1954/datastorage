import { Filter } from '../../types/recipe';

export const newFilter = (): Filter => {
    const filter: Filter = {
        group: '',
        subgroup: '',
        name: ''
    }

    return filter;
};
