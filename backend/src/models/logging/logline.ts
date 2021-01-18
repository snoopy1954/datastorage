/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectLogging from '../../connections/logging';
import loglineSchema from '../../schemas/logging/logline';

const loglineModel: mongoose.Model<mongoose.Document, {}> = connectLogging.model('Logline', loglineSchema);

export default loglineModel;
