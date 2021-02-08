/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import bookConnection from '../../connections/book';
import tongueSchema from '../../schemas/book/tongue';

const tongueModel: mongoose.Model<mongoose.Document, {}> = bookConnection.model('Tongue', tongueSchema);

export default tongueModel;
