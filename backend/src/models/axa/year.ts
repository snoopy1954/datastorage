/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import axaConnection from '../../connections/axa';
import yearSchema from '../../schemas/axa/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = axaConnection.model('Year', yearSchema);

export default yearModel;
