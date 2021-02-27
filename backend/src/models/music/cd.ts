/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import musicConnection from '../../connections/music';
import cdSchema from '../../schemas/music/cd';

const cdModel: mongoose.Model<mongoose.Document, {}> = musicConnection.model('Cd', cdSchema);

export default cdModel;
