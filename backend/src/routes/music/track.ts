/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Track from '../../models/music/track';
import { toTrack } from '../../utils/music';

const trackRouter = express.Router();

trackRouter.get('/', async (_request, response) => {
    const tracks = await Track.find({});
  
    response.json(tracks.map(track => track.toJSON()));
});

trackRouter.get('/:id', async (request, response) => {
    try {
        const track = await Track.findById(request.params.id);
        if (track) response.json(track.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

trackRouter.post('/', async (request, response) => {
    try {
        const newTrack = new Track(toTrack(request.body));
        void await newTrack.save();
        response.json(newTrack);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

trackRouter.delete('/:id', async (request, response) => {
    try {
        const track = await Track.findByIdAndRemove(request.params.id);
        if (track) response.json(track.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
trackRouter.put('/:id', async (request, response) => {
    try {
        const newTrack = toTrack(request.body); 
        const track = await Track.findByIdAndUpdate(request.params.id, newTrack, { new: true });
        if (track) response.json(track.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default trackRouter;