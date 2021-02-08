/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import loggingConnection from '../../connections/logging';
import infoSchema from '../../schemas/logging/info';

const infoModel: mongoose.Model<mongoose.Document, {}> = loggingConnection.model('Info', infoSchema);

export default infoModel;
