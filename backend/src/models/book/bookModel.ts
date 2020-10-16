/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectBuch from "../../connections/connectBuch";
import bookSchema from "../../schemas/book/bookSchema";

const bookModel: mongoose.Model<mongoose.Document, {}> = connectBuch.model('Book', bookSchema);

export default bookModel;
