/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAxa from "../../connections/axa";
import billSchema from "../../schemas/axa/bill";

const billModel: mongoose.Model<mongoose.Document, {}> = connectAxa.model('Bill', billSchema);

export default billModel;
