/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connPressure from "../../connections/pressure";
import yearSchema from '../../schemas/pressure/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = connPressure.model('Year', yearSchema);

export default yearModel;
