/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import musicConnection from '../../connections/music';
import artistSchema from '../../schemas/music/artist';

const artistModel: mongoose.Model<mongoose.Document, {}> = musicConnection.model('Artist', artistSchema);

export default artistModel;
