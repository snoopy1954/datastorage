/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import sudokuConnection from '../../connections/sudoku';
import sudokuSchema from '../../schemas/sudoku';

const sudokuModel: mongoose.Model<mongoose.Document, {}> = sudokuConnection.model('Sudoku', sudokuSchema);

export default sudokuModel;
