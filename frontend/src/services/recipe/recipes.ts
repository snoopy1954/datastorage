import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Recipe, RecipeNoID } from '../../../../backend/src/types/recipe';

const getAll = async () => {
    const { data: recipes } = await axios.get<Recipe[]>(
        `${apiBaseUrl}/recipes`
    );

    return recipes;
}

const getOne = async (id: string) => {
    const { data: recipe } = await axios.get<Recipe>(
        `${apiBaseUrl}/recipes/${id}`
    );

    return recipe;
}

const create = async (recipe: RecipeNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/recipes`,
        recipe
    );

    return response.data
}

const update = async (id: string, recipe: RecipeNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/recipes/${id}`, 
        recipe
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/recipes/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
