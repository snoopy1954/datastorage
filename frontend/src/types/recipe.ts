import { RecipeNoID } from '../../../backend/src/types/recipe';
import { ContentWithFile } from '../types/basic';

export interface Filter {
    group: string;
    subgroup: string;
    name: string;
}

export interface RecipeWithFileNoID extends RecipeNoID {
    file: File;
}

export interface RecipeWithContentNoID extends RecipeNoID {
    contentwithfile: ContentWithFile;
}

