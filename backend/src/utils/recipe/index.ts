/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeNoID } from '../../types/recipe';
import { parseString, parseNumber, parseStringArray } from './../basicParser';

export const toRecipe = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const group = parseString(object.group);
    const subgroup = parseString(object.subgroup);
    const filename = parseString(object.content.filename);
    const filetype = parseString(object.content.filetype);
    const filesize = parseString(object.content.filesize);
    const dataId = parseString(object.content.dataId);
    const date = parseString(object.content.date);
    const description = parseString(object.content.description);
    const keywords = parseStringArray(object.keywords);
    const recipe: RecipeNoID = {
        name, 
        seqnr,
        group,
        subgroup,
        content: {
            dataId,
            filename,
            filetype,
            filesize,
            date,
            description,
            seqnr: 0
        },
        keywords
    };

    return recipe;
};

