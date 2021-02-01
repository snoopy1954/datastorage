/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import accountConnection from '../../connections/account';
import accounttypeSchema from '../../schemas/account/accounttype';

const accounttypeModel: mongoose.Model<mongoose.Document, {}> = accountConnection.model('Accounttype', accounttypeSchema);

export default accounttypeModel;
