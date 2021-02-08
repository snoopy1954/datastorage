/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import bookConnection from '../../connections/book';
import bookSchema from '../../schemas/book/book';

const bookModel: mongoose.Model<mongoose.Document, {}> = bookConnection.model('Book', bookSchema);

export default bookModel;
