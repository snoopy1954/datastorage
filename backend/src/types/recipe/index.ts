import { Name, Content2 } from '../basic';

export interface Recipe extends Name {
    id: string;
    group: string;
    subgroup: string;
    content: Content2;
    keywords: string[];
}

export type RecipeNoID = Omit<Recipe, 'id'>;
