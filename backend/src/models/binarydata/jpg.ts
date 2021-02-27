/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import imageConnection from '../../connections/image';
import binarydataSchema from '../../schemas/binarydata';

const jpgModel: mongoose.Model<mongoose.Document, {}> = imageConnection.model('Jpg', binarydataSchema, 'jpg');

export default jpgModel;
