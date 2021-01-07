/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Movieformat from '../../models/movie/movieformat';
import { toNewMovieformat } from '../../utils/movie';

const formatsRouter = express.Router();

formatsRouter.get('/', async (_request, response) => {
    const formats = await Movieformat.find({});
  
    response.json(formats.map(movieformat => movieformat.toJSON()));
});

formatsRouter.get('/:id', async (request, response) => {
    try {
        const movieformat = await Movieformat.findById(request.params.id);
        if (movieformat) response.json(movieformat.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

formatsRouter.post('/', async (request, response) => {
    try {
        const newMovieformat = new Movieformat(toNewMovieformat(request.body));
        void await newMovieformat.save();
        response.json(newMovieformat);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

formatsRouter.delete('/:id', async (request, response) => {
    try {
        const movieformat = await Movieformat.findByIdAndRemove(request.params.id);
        if (movieformat) response.json(movieformat.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
formatsRouter.put('/:id', async (request, response) => {
    try {
        const newMovieformat = new Movieformat(toNewMovieformat(request.body)); 
        const movieformat = await Movieformat.findByIdAndUpdate(request.params.id, newMovieformat, { new: true });
        if (movieformat) response.json(movieformat.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default formatsRouter;