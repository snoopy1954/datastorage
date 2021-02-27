/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import musicConnection from '../../connections/music';
import selectionSchema from '../../schemas/music/selection';

const selectionModel: mongoose.Model<mongoose.Document, {}> = musicConnection.model('Selection', selectionSchema);

export default selectionModel;
