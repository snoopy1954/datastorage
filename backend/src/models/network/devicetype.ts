/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connectNetwork from '../../connections/network';
import devicetypeSchema from "../../schemas/network/devicetype";

const devicetypeModel: mongoose.Model<mongoose.Document, {}> = connectNetwork.model('Devicetype', devicetypeSchema);

export default devicetypeModel;
