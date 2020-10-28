/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAdresse from '../../connections/address';
import addressgroupSchema from '../../schemas/address/addressgroup';

const addressgroupModel: mongoose.Model<mongoose.Document, {}> = connectAdresse.model('Addressgroup', addressgroupSchema);

export default addressgroupModel;
