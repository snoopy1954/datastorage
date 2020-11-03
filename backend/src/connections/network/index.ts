import mongoose from 'mongoose';

import { MONGODB_URI_NETWORK } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_NETWORK ? MONGODB_URI_NETWORK : "";

const connNetwork: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connNetwork.on('error', function () { logError(`error connecting to MongoDB network\n`); });
connNetwork.once('open', function () { logInfo('connected to MongoDB network'); });

export default connNetwork;
