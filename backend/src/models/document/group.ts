/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import documentConnection from '../../connections/document';
import groupSchema from '../../schemas/basic/group';

const groupModel: mongoose.Model<mongoose.Document, {}> = documentConnection.model('Group', groupSchema);

export default groupModel;
