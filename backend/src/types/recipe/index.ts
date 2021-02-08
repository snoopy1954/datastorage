import { Name, Content } from '../basic';

export interface Recipe extends Name {
    id: string;
    group: string;
    subgroup: string;
    content: Content;
    keywords: string[];
}

export type RecipeNoID = Omit<Recipe, 'id'>;
