/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import sportConnection from '../../connections/sport';
import yearSchema from '../../schemas/basic/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = sportConnection.model('Year', yearSchema);

export default yearModel;
