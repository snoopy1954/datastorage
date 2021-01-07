/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Moviegroup from '../../models/movie/moviegroup';
import { toNewMoviegroup } from '../../utils/movie';

const moviegroupsRouter = express.Router();

moviegroupsRouter.get('/', async (_request, response) => {
    const moviegroups = await Moviegroup.find({});
  
    response.json(moviegroups.map(moviegroup => moviegroup.toJSON()));
});

moviegroupsRouter.get('/:id', async (request, response) => {
    try {
        const moviegroup = await Moviegroup.findById(request.params.id);
        if (moviegroup) response.json(moviegroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

moviegroupsRouter.post('/', async (request, response) => {
    try {
        const newMoviegroup = new Moviegroup(toNewMoviegroup(request.body));
        void await newMoviegroup.save();
        response.json(newMoviegroup);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

moviegroupsRouter.delete('/:id', async (request, response) => {
    try {
        const moviegroup = await Moviegroup.findByIdAndRemove(request.params.id);
        if (moviegroup) response.json(moviegroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
moviegroupsRouter.put('/:id', async (request, response) => {
    try {
        const newMoviegroup = toNewMoviegroup(request.body); 
        const moviegroup = await Moviegroup.findByIdAndUpdate(request.params.id, newMoviegroup, { new: true });
        if (moviegroup) response.json(moviegroup.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default moviegroupsRouter;