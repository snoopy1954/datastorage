/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import accountConnection from '../../connections/account';
import accountyearSchema from '../../schemas/account/accountyear';

const accountyearModel: mongoose.Model<mongoose.Document, {}> = accountConnection.model('Accountyear', accountyearSchema);

export default accountyearModel;
