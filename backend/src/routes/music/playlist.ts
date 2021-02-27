/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Playlist from '../../models/music/playlist';
import { toPlaylist } from '../../utils/music';

const playlistRouter = express.Router();

playlistRouter.get('/', async (_request, response) => {
    const playlists = await Playlist.find({});
  
    response.json(playlists.map(playlist => playlist.toJSON()));
});

playlistRouter.get('/:id', async (request, response) => {
    try {
        const playlist = await Playlist.findById(request.params.id);
        if (playlist) response.json(playlist.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

playlistRouter.post('/', async (request, response) => {
    try {
        const newPlaylist = new Playlist(toPlaylist(request.body));
        void await newPlaylist.save();
        response.json(newPlaylist);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

playlistRouter.delete('/:id', async (request, response) => {
    try {
        const playlist = await Playlist.findByIdAndRemove(request.params.id);
        if (playlist) response.json(playlist.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
playlistRouter.put('/:id', async (request, response) => {
    try {
        const newPlaylist = toPlaylist(request.body); 
        const playlist = await Playlist.findByIdAndUpdate(request.params.id, newPlaylist, { new: true });
        if (playlist) response.json(playlist.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default playlistRouter;