export interface Sudoku {
    id: string;
    game: string;
    solution: string;
}

export type SudokuNoID = Omit<Sudoku, 'id'>;
