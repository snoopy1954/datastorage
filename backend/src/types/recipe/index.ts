import { Name, Content } from '../basic';

export interface Recipe extends Name {
    id: string;
    group: string;
    subgroup: string;
    content: Content;
}

export type RecipeNoID = Omit<Recipe, 'id'>;
