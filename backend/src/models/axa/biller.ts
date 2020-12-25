/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAxa from "../../connections/axa";
import billerSchema from "../../schemas/axa/biller";

const billerModel: mongoose.Model<mongoose.Document, {}> = connectAxa.model('Biller', billerSchema);

export default billerModel;
