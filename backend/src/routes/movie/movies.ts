/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Movie from '../../models/movie/movie';
import { toNewMovie } from '../../utils/movie/parameters';

const moviesRouter = express.Router();

moviesRouter.get('/', async (_request, response) => {
    const movies = await Movie.find({});
  
    response.json(movies.map(movie => movie.toJSON()));
});

moviesRouter.get('/:id', async (request, response) => {
    try {
        const movie = await Movie.findById(request.params.id);
        if (movie) response.json(movie.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

moviesRouter.post('/', async (request, response) => {
    try {
        const newMovie = new Movie(toNewMovie(request.body));
        void await newMovie.save();
        response.json(newMovie);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

moviesRouter.delete('/:id', async (request, response) => {
    try {
        const movie = await Movie.findByIdAndRemove(request.params.id);
        if (movie) response.json(movie.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
moviesRouter.put('/:id', async (request, response) => {
    try {
        const newMovie = toNewMovie(request.body); 
        const movie = await Movie.findByIdAndUpdate(request.params.id, newMovie, { new: true });
        if (movie) response.json(movie.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default moviesRouter;