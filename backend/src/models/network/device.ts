/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connectNetwork from '../../connections/network';
import deviceSchema from "../../schemas/network/device";

const deviceModel: mongoose.Model<mongoose.Document, {}> = connectNetwork.model('Device', deviceSchema);

export default deviceModel;
