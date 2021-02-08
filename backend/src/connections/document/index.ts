import mongoose from 'mongoose';

import { MONGODB_URI } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const database = 'document';
const url: string = MONGODB_URI ? MONGODB_URI.replace('DATABASE', database) : "";

const documentConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
documentConnection.on('error', function () { logError(`error connecting to MongoDB ${database}\n`); });
documentConnection.once('open', function () { logInfo(`connected to MongoDB ${database}`); });

export default documentConnection;
