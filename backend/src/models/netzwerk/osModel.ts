/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connectNetzwerk from "../../connections/connectNetzwerk";
import osSchema from "../../schemas/netzwerk/osSchema";

const osModel: mongoose.Model<mongoose.Document, {}> = connectNetzwerk.model('Os', osSchema);

export default osModel;
