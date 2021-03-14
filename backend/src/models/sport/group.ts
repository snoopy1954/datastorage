/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import sportConnection from '../../connections/sport';
import groupSchema from '../../schemas/basic/group';

const groupModel: mongoose.Model<mongoose.Document, {}> = sportConnection.model('Group', groupSchema);

export default groupModel;
