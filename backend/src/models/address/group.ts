/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import addressConnection from '../../connections/address';
import groupSchema from '../../schemas/basic/group';

const groupModel: mongoose.Model<mongoose.Document, {}> = addressConnection.model('Group', groupSchema);

export default groupModel;
