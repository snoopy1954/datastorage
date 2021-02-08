/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import networkConnection from '../../connections/network';
import devicetypeSchema from "../../schemas/network/devicetype";

const devicetypeModel: mongoose.Model<mongoose.Document, {}> = networkConnection.model('Devicetype', devicetypeSchema);

export default devicetypeModel;
