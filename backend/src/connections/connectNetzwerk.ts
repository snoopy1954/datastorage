import mongoose from 'mongoose';

import { MONGODB_URI_NETZWERK } from '../utils/config';
import { logInfo, logError } from '../utils/logger';

const url: string = MONGODB_URI_NETZWERK ? MONGODB_URI_NETZWERK : "";

const connNetzwerk: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connNetzwerk.on('error', function () { logError(`error connecting to MongoDB netzwerk\n`); });
connNetzwerk.once('open', function () { logInfo('connected to MongoDB netzwerk'); });

export default connNetzwerk;
