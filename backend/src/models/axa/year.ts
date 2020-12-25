/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAxa from '../../connections/axa';
import yearSchema from '../../schemas/axa/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = connectAxa.model('Year', yearSchema);

export default yearModel;
