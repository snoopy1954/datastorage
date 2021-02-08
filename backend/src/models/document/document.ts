/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import documentConnection from '../../connections/document';
import documentSchema from '../../schemas/document/document';

const documentModel: mongoose.Model<mongoose.Document, {}> = documentConnection.model('Document', documentSchema);

export default documentModel;
