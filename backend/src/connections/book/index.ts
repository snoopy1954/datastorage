import mongoose from 'mongoose';

import { MONGODB_URI } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const database = 'book';
const url: string = MONGODB_URI ? MONGODB_URI.replace('DATABASE', database) : "";

const bookConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
bookConnection.on('error', function () { logError(`error connecting to MongoDB ${database}\n`); });
bookConnection.once('open', function () { logInfo(`connected to MongoDB ${database}`); });

export default bookConnection;
