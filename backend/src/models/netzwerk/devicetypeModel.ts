/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connectNetzwerk from "../../connections/connectNetzwerk";
import devicetypeSchema from "../../schemas/netzwerk/devicetypeSchema";

const devicetypeModel: mongoose.Model<mongoose.Document, {}> = connectNetzwerk.model('Devicetype', devicetypeSchema);

export default devicetypeModel;
