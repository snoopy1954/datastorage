import mongoose from 'mongoose';

import { MONGODB_URI_SUDOKU } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_SUDOKU ? MONGODB_URI_SUDOKU : "";

const sudokuConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
sudokuConnection.on('error', function () { logError(`error connecting to MongoDB sudoku\n`); });
sudokuConnection.once('open', function () { logInfo('connected to MongoDB sudoku'); });

export default sudokuConnection;
