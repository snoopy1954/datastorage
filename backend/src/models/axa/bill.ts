/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import axaConnection from "../../connections/axa";
import billSchema from "../../schemas/axa/bill";

const billModel: mongoose.Model<mongoose.Document, {}> = axaConnection.model('Bill', billSchema);

export default billModel;
