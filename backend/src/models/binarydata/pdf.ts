/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import imageConnection from '../../connections/image';
import binarydataSchema from '../../schemas/binarydata';

const pdfModel: mongoose.Model<mongoose.Document, {}> = imageConnection.model('Pdf', binarydataSchema, 'pdf');

export default pdfModel;
