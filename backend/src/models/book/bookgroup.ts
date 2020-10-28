/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectBuch from "../../connections/book";
import bookgroupSchema from "../../schemas/book/bookgroup";

const bookgroupModel: mongoose.Model<mongoose.Document, {}> = connectBuch.model('Bookgroup', bookgroupSchema);

export default bookgroupModel;
