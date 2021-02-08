/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import loggingConnection from '../../connections/logging';
import historylineSchema from '../../schemas/logging/historyline';

const historylineModel: mongoose.Model<mongoose.Document, {}> = loggingConnection.model('Historyline', historylineSchema);

export default historylineModel;
