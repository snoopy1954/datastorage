/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import accountConnection from '../../connections/account';
import transactionSchema from '../../schemas/account/transaction';

const transactionModel: mongoose.Model<mongoose.Document, {}> = accountConnection.model('Transaction', transactionSchema);

export default transactionModel;
