import mongoose from 'mongoose';

import { MONGODB_URI_PRESSURE } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_PRESSURE ? MONGODB_URI_PRESSURE : "";

const connPressure: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connPressure.on('error', function () { logError(`error connecting to MongoDB pressure\n`); });
connPressure.once('open', function () { logInfo('connected to MongoDB pressure'); });

export default connPressure;
