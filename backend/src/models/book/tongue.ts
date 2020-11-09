/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectBuch from "../../connections/book";
import tongueSchema from "../../schemas/book/tongue";

const tongueModel: mongoose.Model<mongoose.Document, {}> = connectBuch.model('Tongue', tongueSchema);

export default tongueModel;