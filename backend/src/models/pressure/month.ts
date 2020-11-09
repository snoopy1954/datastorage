/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connBlutdruck from "../../connections/pressure";
import monthSchema from "../../schemas/pressure/month";

const monthModel: mongoose.Model<mongoose.Document, {}> = connBlutdruck.model('Month', monthSchema);

export default monthModel;