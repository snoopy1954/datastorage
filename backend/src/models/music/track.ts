/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import musicConnection from '../../connections/music';
import trackSchema from '../../schemas/music/track';

const trackModel: mongoose.Model<mongoose.Document, {}> = musicConnection.model('Track', trackSchema);

export default trackModel;
