/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import pressureConnection from "../../connections/pressure";
import monthSchema from "../../schemas/pressure/month";

const monthModel: mongoose.Model<mongoose.Document, {}> = pressureConnection.model('Month', monthSchema);

export default monthModel;
