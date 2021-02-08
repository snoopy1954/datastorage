/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import axaConnection from "../../connections/axa";
import accountSchema from "../../schemas/axa/account";

const accountModel: mongoose.Model<mongoose.Document, {}> = axaConnection.model('Account', accountSchema);

export default accountModel;
