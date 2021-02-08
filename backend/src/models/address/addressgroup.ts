/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import addressConnection from '../../connections/address';
import addressgroupSchema from '../../schemas/address/addressgroup';

const addressgroupModel: mongoose.Model<mongoose.Document, {}> = addressConnection.model('Addressgroup', addressgroupSchema);

export default addressgroupModel;
