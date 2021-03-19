/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import bookConnection from '../../connections/book';
import groupSchema from '../../schemas/basic/group';

const groupModel: mongoose.Model<mongoose.Document, {}> = bookConnection.model('Group', groupSchema);

export default groupModel;
