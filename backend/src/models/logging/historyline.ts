/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectLogging from '../../connections/logging';
import historylineSchema from '../../schemas/logging/historyline';

const historylineModel: mongoose.Model<mongoose.Document, {}> = connectLogging.model('Historyline', historylineSchema);

export default historylineModel;
