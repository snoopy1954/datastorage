/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import bookConnection from '../../connections/book';
import formatSchema from '../../schemas/book/format';

const formatModel: mongoose.Model<mongoose.Document, {}> = bookConnection.model('Format', formatSchema);

export default formatModel;
