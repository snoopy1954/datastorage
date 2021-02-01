/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectBook from '../../connections/book';
import formatSchema from '../../schemas/book/format';

const formatModel: mongoose.Model<mongoose.Document, {}> = connectBook.model('Format', formatSchema);

export default formatModel;
