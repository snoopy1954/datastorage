/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connectNetzwerk from "../../connections/connectNetzwerk";
import deviceSchema from "../../schemas/netzwerk/deviceSchema";

const deviceModel: mongoose.Model<mongoose.Document, {}> = connectNetzwerk.model('Device', deviceSchema);

export default deviceModel;
