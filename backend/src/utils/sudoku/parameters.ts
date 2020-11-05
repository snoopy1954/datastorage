/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SudokuNoID } from '../../types/sudoku';

import { parseString } from '../basicParser';

export const toNewSudoku = (object: any): SudokuNoID => {
    // console.log(object);
    const game = parseString(object.game);
    const solution = parseString(object.solution);
    // console.log(`game='${game}'`);
    // console.log(`solution='${solution}'`);

    const newSudoku: SudokuNoID = {
        game,
        solution
    };
    
    return newSudoku;
};
