import { RecipeNoID } from '../../../backend/src/types/recipe';

export interface Filter {
    group: string;
    subgroup: string;
    name: string;
}

export interface RecipeWithFileNoID extends RecipeNoID {
    file: File;
}


