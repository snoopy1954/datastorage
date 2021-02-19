/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import sportConnection from '../../connections/sport';
import groupSchema from '../../schemas/basic/group';

const sportgroupModel: mongoose.Model<mongoose.Document, {}> = sportConnection.model('Sportgroup', groupSchema);

export default sportgroupModel;
