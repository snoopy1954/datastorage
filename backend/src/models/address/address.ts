/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAdresse from "../../connections/address";
import addressSchema from "../../schemas/address/address";

const addressModel: mongoose.Model<mongoose.Document, {}> = connectAdresse.model('Address', addressSchema);

export default addressModel;
