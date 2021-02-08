/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import imageConnection from '../../connections/image';
import imageSchema from '../../schemas/image';

const imageModel: mongoose.Model<mongoose.Document, {}> = imageConnection.model('Image', imageSchema);

export default imageModel;
