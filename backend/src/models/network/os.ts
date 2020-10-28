/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose from 'mongoose';

import connectNetzwerk from '../../connections/network';
import osSchema from "../../schemas/network/os";

const osModel: mongoose.Model<mongoose.Document, {}> = connectNetzwerk.model('Os', osSchema);

export default osModel;
