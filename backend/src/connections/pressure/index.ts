import mongoose from 'mongoose';

import { MONGODB_URI } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const database = 'pressure';
const url: string = MONGODB_URI ? MONGODB_URI.replace('DATABASE', database) : "";

const pressureConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
pressureConnection.on('error', function () { logError(`error connecting to MongoDB ${database}\n`); });
pressureConnection.once('open', function () { logInfo(`connected to MongoDB ${database}`); });

export default pressureConnection;
