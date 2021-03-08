import { Recipe, RecipeNoID } from '../../../../backend/src/types/recipe';
import { Group } from '../../../../backend/src/types/basic';
import { Filter } from '../../types/recipe';

export const newRecipe = (): RecipeNoID => {
    const recipe: RecipeNoID = {
        name: "",
        seqnr: 0,
        group: '',
        subgroup: '',
        content: {
            filename: '',
            filetype: '',
            filesize: '',
            dataId: '',
            date: '',
            description: '',
            seqnr: 0
        },
        keywords: []
    };

    return recipe;
};

export const emptyRecipe = (): Recipe => {
    const recipe: Recipe = {
        id: '',
        name: "",
        seqnr: 0,
        group: '',
        subgroup: '',
        content: {
            filename: '',
            filetype: '',
            filesize: '',
            dataId: '',
            date: '',
            description: '',
            seqnr: 0
        },
        keywords: []
    }
    return recipe;
};

export const nextRecipe = (recipes: Recipe[]): RecipeNoID => {
    const recipe: RecipeNoID = {
        name: "",
        seqnr: nextSeqnr(recipes),
        group: '',
        subgroup: '',
        content: {
            filename: '',
            filetype: '',
            filesize: '',
            dataId: '',
            date: '',
            description: '',
            seqnr: 0
        },
        keywords: []
    };

    return recipe;
};

export const nextSeqnr = (recipes: Recipe[]): number => {
    let maxNumber = 0;

    Object.values(recipes).forEach(recipe => {
        if (recipe.seqnr >maxNumber) maxNumber = recipe.seqnr;
    });
    
    return maxNumber+1;
};

const sortElements = (a: Recipe, b: Recipe) => {
    const nameA = a.seqnr;
    const nameB = b.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const sortRecipes = (recipes: Recipe[], recipegroups: Group[]) => {
    let recipeListSorted: Recipe[] = [];
    let sortedRecipegroup;
    let sortedSubgroup;

    recipegroups.forEach(recipegroup => {
        sortedRecipegroup = [];
        if (recipegroup.subgroups.length===0) {
            sortedRecipegroup = recipes.filter(recipe => recipe.group===recipegroup.name);
            recipeListSorted = recipeListSorted.concat(sortedRecipegroup.sort(sortElements));
        }
        else {
            recipegroup.subgroups.forEach(subgroup => {
                sortedSubgroup = recipes.filter(recipe => recipe.subgroup===subgroup);
                recipeListSorted = recipeListSorted.concat(sortedSubgroup.sort(sortElements));
            });
        }
    });

    return recipeListSorted;
};

export const recipeTitle = (filters: Filter): string => {
    let filter = (filters.group!=="") ? ': ' + filters.group : '';
    filter += (filters.subgroup!=="") ? ' - ' + filters.subgroup : '';

    return filter;
};

export const recipeFilter = (recipes: Recipe[], filters: Filter, recipegroups: Group[]): Recipe[] => {
    let filteredRecipes = (filters.group!=="") ? Object.values(recipes).filter(recipe => recipe.group===filters.group) : recipes;
    filteredRecipes = (filters.subgroup!=="") ? Object.values(filteredRecipes).filter(recipe => recipe.subgroup===filters.subgroup) : filteredRecipes;
    filteredRecipes = (filters.name!=="") ? Object.values(filteredRecipes).filter(recipe => recipe.name.includes(filters.name)) : filteredRecipes;
    const sortedRecipes = sortRecipes(Object.values(filteredRecipes), Object.values(recipegroups));

    return sortedRecipes;
};



