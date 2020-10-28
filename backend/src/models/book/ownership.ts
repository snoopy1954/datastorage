/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectBuch from "../../connections/book";
import ownershipSchema from "../../schemas/book/ownership";

const ownershipModel: mongoose.Model<mongoose.Document, {}> = connectBuch.model('Ownership', ownershipSchema);

export default ownershipModel;
