/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import cors from 'cors';

import monthsRouter from './routes/pressure/months';
import exchangeRouter from './routes/pressure/exchange';
import devicesRouter from './routes/network/devices';
import devicetypesRouter from './routes/network/devicetypes';
import ossRouter from './routes/network/oss';
import bookgroupsRouter from './routes/book/bookgroups';
import ownershipsRouter from './routes/book/ownerships';
import formatsRouter from './routes/book/formats';
import tonguesRouter from './routes/book/tongues';
import booksRouter from './routes/book/books';
import imagesRouter from './routes/image/images';


const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use('/api/months', monthsRouter);
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
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.json('pong');
});

export default app;