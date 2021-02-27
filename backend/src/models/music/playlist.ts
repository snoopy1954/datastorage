/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import musicConnection from '../../connections/music';
import playlistSchema from '../../schemas/music/playlist';

const playlistModel: mongoose.Model<mongoose.Document, {}> = musicConnection.model('Playlist', playlistSchema);

export default playlistModel;
