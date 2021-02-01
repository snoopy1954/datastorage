import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI_AXA = process.env.MONGODB_URI_AXA;
export const MONGODB_URI_NETWORK = process.env.MONGODB_URI_NETWORK;
export const MONGODB_URI_PRESSURE = process.env.MONGODB_URI_PRESSURE;
export const MONGODB_URI_BOOK = process.env.MONGODB_URI_BOOK;
export const MONGODB_URI_MOVIE = process.env.MONGODB_URI_MOVIE;
export const MONGODB_URI_IMAGE = process.env.MONGODB_URI_IMAGE;
export const MONGODB_URI_ADDRESS = process.env.MONGODB_URI_ADDRESS;
export const MONGODB_URI_SUDOKU = process.env.MONGODB_URI_SUDOKU;
export const MONGODB_URI_ACCOUNT = process.env.MONGODB_URI_ACCOUNT;
export const MONGODB_URI_LOGGING = process.env.MONGODB_URI_LOGGING;
