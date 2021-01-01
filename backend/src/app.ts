/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import cors from 'cors';

import monthsRouter from './routes/pressure/months';
import pressureyearsRouter from './routes/pressure/years';
import exchangeRouter from './routes/pressure/exchange';
import devicesRouter from './routes/network/devices';
import devicetypesRouter from './routes/network/devicetypes';
import ossRouter from './routes/network/oss';
import bookgroupsRouter from './routes/book/bookgroups';
import ownershipsRouter from './routes/book/ownerships';
import formatsRouter from './routes/book/formats';
import tonguesRouter from './routes/book/tongues';
import booksRouter from './routes/book/books';
import imagesRouter from './routes/image';
import addressgroupsRouter from './routes/address/addressgroups';
import addressesRouter from './routes/address/addresses';
import moviesRouter from './routes/movie/movies';
import moviegroupsRouter from './routes/movie/moviegroups';
import movieformatsRouter from './routes/movie/movieformats';
import sudokusRouter from './routes/sudoku/sudoku';
import billsRouter from './routes/axa/bill';
import billersRouter from './routes/axa/biller';
import accountsRouter from './routes/axa/account';
import yearsRouter from './routes/axa/year';

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use('/api/months', monthsRouter);
app.use('/api/pressureyears', pressureyearsRouter);
app.use('/api/exchange', exchangeRouter);
app.use('/api/devices', devicesRouter);
app.use('/api/devicetypes', devicetypesRouter);
app.use('/api/oss', ossRouter);
app.use('/api/bookgroups', bookgroupsRouter);
app.use('/api/ownerships', ownershipsRouter);
app.use('/api/formats', formatsRouter);
app.use('/api/tongues', tonguesRouter);
app.use('/api/books', booksRouter);
app.use('/api/images', imagesRouter);
app.use('/api/addressgroups', addressgroupsRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/moviegroups', moviegroupsRouter);
app.use('/api/movieformats', movieformatsRouter);
app.use('/api/sudokus', sudokusRouter);
app.use('/api/bills', billsRouter);
app.use('/api/billers', billersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/years', yearsRouter);
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.json('pong');
});

export default app;