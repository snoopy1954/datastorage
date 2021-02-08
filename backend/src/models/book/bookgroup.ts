/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import bookConnection from '../../connections/book';
import groupSchema from '../../schemas/basic/group';

const bookgroupModel: mongoose.Model<mongoose.Document, {}> = bookConnection.model('Bookgroup', groupSchema);

export default bookgroupModel;
