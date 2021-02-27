/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Artist from '../../models/music/artist';
import { toArtist } from '../../utils/music';

const artistRouter = express.Router();

artistRouter.get('/', async (_request, response) => {
    const artists = await Artist.find({});
  
    response.json(artists.map(artist => artist.toJSON()));
});

artistRouter.get('/:id', async (request, response) => {
    try {
        const artist = await Artist.findById(request.params.id);
        if (artist) response.json(artist.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

artistRouter.post('/', async (request, response) => {
    try {
        const newArtist = new Artist(toArtist(request.body));
        void await newArtist.save();
        response.json(newArtist);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

artistRouter.delete('/:id', async (request, response) => {
    try {
        const artist = await Artist.findByIdAndRemove(request.params.id);
        if (artist) response.json(artist.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
artistRouter.put('/:id', async (request, response) => {
    try {
        const newArtist = toArtist(request.body); 
        const artist = await Artist.findByIdAndUpdate(request.params.id, newArtist, { new: true });
        if (artist) response.json(artist.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default artistRouter;