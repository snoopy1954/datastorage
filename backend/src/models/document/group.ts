/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import documentConnection from '../../connections/document';
import groupSchema from '../../schemas/basic/group';

const documentgroupModel: mongoose.Model<mongoose.Document, {}> = documentConnection.model('Documentgroup', groupSchema);

export default documentgroupModel;
