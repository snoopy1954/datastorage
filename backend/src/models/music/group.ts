/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import musicConnection from '../../connections/music';
import groupSchema from '../../schemas/basic/group';

const musicgroupModel: mongoose.Model<mongoose.Document, {}> = musicConnection.model('Musicgroup', groupSchema);

export default musicgroupModel;
