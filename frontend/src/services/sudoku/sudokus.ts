import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Sudoku, SudokuNoID } from '../../../../backend/src/types/sudoku';

const getAll = async () => {
    const { data: sudokus } = await axios.get<Sudoku[]>(
        `${apiBaseUrl}/sudokus`
    );

    return sudokus;
}

const getOne = async (id: string) => {
    const { data: sudoku } = await axios.get<Sudoku>(
        `${apiBaseUrl}/sudokus/${id}`
    );

    return sudoku;
}

const create = async (sudoku: SudokuNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/sudokus`,
        sudoku
    );

    return response.data
}

const update = async (id: string, sudoku: Sudoku) => {
    const response = await axios.put(
        `${apiBaseUrl}/sudokus/${id}`, 
        sudoku
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/sudokus/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
