/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import addressConnection from "../../connections/address";
import addressSchema from "../../schemas/address/address";

const addressModel: mongoose.Model<mongoose.Document, {}> = addressConnection.model('Address', addressSchema);

export default addressModel;
