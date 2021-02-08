/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import networkConnection from '../../connections/network';
import osSchema from "../../schemas/network/os";

const osModel: mongoose.Model<mongoose.Document, {}> = networkConnection.model('Os', osSchema);

export default osModel;
