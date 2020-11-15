/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAxa from "../../connections/axa";
import accountSchema from "../../schemas/axa/account";

const accountModel: mongoose.Model<mongoose.Document, {}> = connectAxa.model('Account', accountSchema);

export default accountModel;
