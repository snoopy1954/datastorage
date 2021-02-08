import mongoose from 'mongoose';

import { MONGODB_URI } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const database = 'address';
const url: string = MONGODB_URI ? MONGODB_URI.replace('DATABASE', database) : "";

const addressConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
addressConnection.on('error', function () { logError(`error connecting to MongoDB ${database}\n`); });
addressConnection.once('open', function () { logInfo(`connected to MongoDB ${database}`); });

export default addressConnection;
