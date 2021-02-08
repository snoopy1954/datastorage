/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import pressureConnection from "../../connections/pressure";
import yearSchema from '../../schemas/pressure/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = pressureConnection.model('Year', yearSchema);

export default yearModel;
