/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import documentConnection from '../../connections/document';
import yearSchema from '../../schemas/basic/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = documentConnection.model('Year', yearSchema);

export default yearModel;
