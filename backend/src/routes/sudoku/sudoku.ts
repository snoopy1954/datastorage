/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Sudoku from '../../models/sudoku';
import { toNewSudoku } from '../../utils/sudoku/parameters';

const sudokusRouter = express.Router();

sudokusRouter.get('/', async (_request, response) => {
    const sudokus = await Sudoku.find({});
  
    response.json(sudokus.map(sudoku => sudoku.toJSON()));
});

sudokusRouter.get('/:id', async (request, response) => {
    try {
        const sudoku = await Sudoku.findById(request.params.id);
        if (sudoku) response.json(sudoku.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

sudokusRouter.post('/', async (request, response) => {
    try {
        const newSudoku = new Sudoku(toNewSudoku(request.body));
        void await newSudoku.save();
        response.json(newSudoku);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

sudokusRouter.delete('/:id', async (request, response) => {
    try {
        const sudoku = await Sudoku.findByIdAndRemove(request.params.id);
        if (sudoku) response.json(sudoku.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
sudokusRouter.put('/:id', async (request, response) => {
    try {
        const newSudoku = toNewSudoku(request.body); 
        const sudoku = await Sudoku.findByIdAndUpdate(request.params.id, newSudoku, { new: true });
        if (sudoku) response.json(sudoku.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default sudokusRouter;