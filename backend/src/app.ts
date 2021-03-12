/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import cors from 'cors';

import filesRouter from './routes/filesystem/files';
import postgresRouter from './routes/postgres/postgres';
import binarydataRouter from './routes/binarydata';

import monthsRouter from './routes/pressure/months';
import pressureyearsRouter from './routes/pressure/years';
import exchangeRouter from './routes/pressure/exchange';

import devicesRouter from './routes/network/devices';
import devicetypesRouter from './routes/network/devicetypes';
import ossRouter from './routes/network/oss';

import bookgroupsRouter from './routes/book/groups';
import ownershipsRouter from './routes/book/ownerships';
import formatsRouter from './routes/book/formats';
import tonguesRouter from './routes/book/tongues';
import booksRouter from './routes/book/books';

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

import infosRouter from './routes/logging/info';
import loglinesRouter from './routes/logging/logline';
import historylinesRouter from './routes/logging/historyline';

import accounttypesRouter from './routes/account/accounttypes';
import accountyearsRouter from './routes/account/accountyears';
import transactionsRouter from './routes/account/transactions';
import kontoPGRouter from './routes/account/exchange';

import recipegroupsRouter from './routes/recipe/groups';
import recipesRouter from './routes/recipe/recipes';

import documentgroupsRouter from './routes/document/groups';
import documentsRouter from './routes/document/documents';

import sportyearsRouter from './routes/sport/sportyears';
import sportgroupsRouter from './routes/sport/groups';
import activitiesRouter from './routes/sport/activities';

import musicgroupRouter from './routes/music/group';
import artistRouter from './routes/music/artist';
import cdRouter from './routes/music/cd';
import playlistRouter from './routes/music/playlist';
import trackRouter from './routes/music/track';
import selectionRouter from './routes/music/selection';


const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use('/api/files', filesRouter);
app.use('/api/postgres', postgresRouter);
app.use('/api/binarydata', binarydataRouter);
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
app.use('/api/loglines', loglinesRouter);
app.use('/api/historylines', historylinesRouter);
app.use('/api/accounttypes', accounttypesRouter);
app.use('/api/accountyears', accountyearsRouter);
app.use('/api/infos', infosRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/kontoPG', kontoPGRouter);
app.use('/api/recipegroups', recipegroupsRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/documentgroups', documentgroupsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/sportyears', sportyearsRouter);
app.use('/api/sportgroups', sportgroupsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/musicgroup', musicgroupRouter);
app.use('/api/artist', artistRouter);
app.use('/api/cd', cdRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/track', trackRouter);
app.use('/api/selection', selectionRouter);

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.json('pong');
});

export default app;