/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import imageConnection from '../../connections/image';
import binarydataSchema from '../../schemas/binarydata';

const binarydataModel: mongoose.Model<mongoose.Document, {}> = imageConnection.model('Binarydata', binarydataSchema, 'binarydata');

export default binarydataModel;
