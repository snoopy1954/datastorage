/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import sportConnection from '../../connections/sport';
import activitySchema from '../../schemas/sport/activity';

const activityModel: mongoose.Model<mongoose.Document, {}> = sportConnection.model('Activity', activitySchema);

export default activityModel;
