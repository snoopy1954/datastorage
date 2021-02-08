/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import bookConnection from '../../connections/book';
import ownershipSchema from '../../schemas/book/ownership';

const ownershipModel: mongoose.Model<mongoose.Document, {}> = bookConnection.model('Ownership', ownershipSchema);

export default ownershipModel;
