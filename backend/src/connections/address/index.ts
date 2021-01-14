import mongoose from 'mongoose';

import { MONGODB_URI_ADDRESS } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_ADDRESS ? MONGODB_URI_ADDRESS : "";

const connectAddress: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connectAddress.on('error', function () { logError(`error connecting to MongoDB address\n`); });
connectAddress.once('open', function () { logInfo('connected to MongoDB address'); });

export default connectAddress;
