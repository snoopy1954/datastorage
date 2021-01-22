/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectLogging from '../../connections/logging';
import infoSchema from '../../schemas/logging/info';

const infoModel: mongoose.Model<mongoose.Document, {}> = connectLogging.model('Info', infoSchema);

export default infoModel;
