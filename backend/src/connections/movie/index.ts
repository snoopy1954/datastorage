import mongoose from 'mongoose';

import { MONGODB_URI } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const database = 'movie';
const url: string = MONGODB_URI ? MONGODB_URI.replace('DATABASE', database) : "";

const movieConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
movieConnection.on('error', function () { logError(`error connecting to MongoDB ${database}\n`); });
movieConnection.once('open', function () { logInfo(`connected to MongoDB ${database}`); });

export default movieConnection;
