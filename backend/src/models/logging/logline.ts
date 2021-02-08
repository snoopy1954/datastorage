/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import loggingConnection from '../../connections/logging';
import loglineSchema from '../../schemas/logging/logline';

const loglineModel: mongoose.Model<mongoose.Document, {}> = loggingConnection.model('Logline', loglineSchema);

export default loglineModel;
