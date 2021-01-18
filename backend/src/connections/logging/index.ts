import mongoose from 'mongoose';

import { MONGODB_URI_LOGGING } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_LOGGING ? MONGODB_URI_LOGGING : "";

const connectLogging: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connectLogging.on('error', function () { logError(`error connecting to MongoDB logging\n`); });
connectLogging.once('open', function () { logInfo('connected to MongoDB logging'); });

export default connectLogging;
