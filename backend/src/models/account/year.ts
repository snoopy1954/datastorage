/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import accountConnection from '../../connections/account';
import yearSchema from '../../schemas/basic/year';

const yearModel: mongoose.Model<mongoose.Document, {}> = accountConnection.model('Year', yearSchema);

export default yearModel;
