/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import axaConnection from "../../connections/axa";
import billerSchema from "../../schemas/axa/biller";

const billerModel: mongoose.Model<mongoose.Document, {}> = axaConnection.model('Biller', billerSchema);

export default billerModel;
