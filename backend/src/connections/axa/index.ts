import mongoose from 'mongoose';

import { MONGODB_URI_AXA } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_AXA ? MONGODB_URI_AXA : "";

const connectAxa: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connectAxa.on('error', function () { logError(`error connecting to MongoDB axa\n`); });
connectAxa.once('open', function () { logInfo('connected to MongoDB axa'); });

export default connectAxa;
