/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import networkConnection from '../../connections/network';
import deviceSchema from "../../schemas/network/device";

const deviceModel: mongoose.Model<mongoose.Document, {}> = networkConnection.model('Device', deviceSchema);

export default deviceModel;
