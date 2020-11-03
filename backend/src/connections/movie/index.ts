import mongoose from 'mongoose';

import { MONGODB_URI_MOVIE } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_MOVIE ? MONGODB_URI_MOVIE : "";

const movieConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
movieConnection.on('error', function () { logError(`error connecting to MongoDB movie\n`); });
movieConnection.once('open', function () { logInfo('connected to MongoDB movie'); });

export default movieConnection;
